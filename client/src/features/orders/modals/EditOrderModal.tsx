"use client";

import {
    fetchAreas,
    fetchCities,
    fetchWarehouses,
} from "@/shared/api/nova-post.api";
import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { Label } from "@/shared/ui/components";
import { InputField } from "@/shared/ui/inputs/InputField";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Controller, useForm } from "react-hook-form";
import { useUpdateOrder } from "../hooks/useOrders";
import { INovaPostDataObj, IOrder, OrderStatus } from "../types/orders.types";

interface EditOrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    order: IOrder;
}

interface FormData {
    fullName: string;
    phoneNumber: string;
    email?: string;
    area: string;
    city: string;
    postDepartment: string;
    additionalInfo?: string;
    status: OrderStatus;
}

export function EditOrderModal({
    isOpen,
    onClose,
    order,
}: EditOrderModalProps) {
    const statusOptions: OrderStatus[] = [
        "pending",
        "paid",
        "shipped",
        "delivered",
        "cancelled",
    ];

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            fullName: "",
            phoneNumber: "",
            email: "",
            area: "",
            city: "",
            postDepartment: "",
            additionalInfo: "",
            status: "pending",
        },
    });

    const [areas, setAreas] = useState<INovaPostDataObj[]>([]);
    const [cities, setCities] = useState<INovaPostDataObj[]>([]);
    const [warehouses, setWarehouses] = useState<INovaPostDataObj[]>([]);

    const [selectedArea, setSelectedArea] = useState<INovaPostDataObj | null>(
        null
    );
    const [selectedCity, setSelectedCity] = useState<INovaPostDataObj | null>(
        null
    );
    const [selectedWarehouse, setSelectedWarehouse] =
        useState<INovaPostDataObj | null>(null);

    const [modalMessage, setModalMessage] = useState("");

    useEscapeKeyClose({ isOpen, onClose });

    useEffect(() => {
        reset({
            fullName: order.fullName,
            phoneNumber: order.phoneNumber,
            email: order.email || "",
            area: order.area,
            city: order.city,
            postDepartment: order.postDepartment,
            additionalInfo: order.additionalInfo || "",
            status: order.status,
        });
        setModalMessage("");
    }, [order, reset]);

    useEffect(() => {
        const loadAreas = async () => {
            try {
                const areas = await fetchAreas();
                setAreas(areas);

                const matchedArea = areas.find(
                    (a) => a.Description === order.area
                );
                if (matchedArea) setSelectedArea(matchedArea);
            } catch (error) {
                console.error("Помилка завантаження областей:", error);
            }
        };
        loadAreas();
    }, [order.area]);

    useEffect(() => {
        if (selectedArea?.Ref) {
            const loadCities = async () => {
                try {
                    const cities = await fetchCities(selectedArea.Ref);
                    setCities(cities);

                    const matchedCity = cities.find(
                        (c) => c.Description === order.city
                    );
                    if (matchedCity) setSelectedCity(matchedCity);
                } catch (error) {
                    console.error("Помилка завантаження міст:", error);
                    setCities([]);
                }
            };
            loadCities();
            setSelectedWarehouse(null);
            setWarehouses([]);
        }
    }, [selectedArea, order.city]);

    useEffect(() => {
        if (selectedCity?.Ref) {
            const loadWarehouses = async () => {
                try {
                    const warehouse = await fetchWarehouses(selectedCity.Ref);
                    setWarehouses(warehouse);

                    const matched = warehouse.find(
                        (w) => w.Description === order.postDepartment
                    );
                    if (matched) setSelectedWarehouse(matched);
                } catch (err) {
                    console.error("Помилка завантаження відділень:", err);
                    setWarehouses([]);
                }
            };
            loadWarehouses();
        }
    }, [selectedCity?.Ref, order.postDepartment]);

    const useUpdateOrderMutation = useUpdateOrder();

    const onSubmit = async (data: FormData) => {
        try {
            if (!order?.id) return;

            await useUpdateOrderMutation.mutateAsync({
                orderId: order.id,
                data,
            });
            onClose();
        } catch (err: any) {
            setModalMessage(
                err?.message || "Помилка при редагуванні замовлення"
            );
        }
    };

    if (!isOpen || !order) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Редагування замовлення"}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[15px]"
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <div className="flex flex-col gap-[15px]">
                            <div className="text-lg">Контактна інформація</div>
                            <div className="flex flex-col gap-[15px]">
                                <InputField
                                    label="Ініціали замовника (ПІБ)*"
                                    placeholder="Іванов Іван Іванович"
                                    {...register("fullName", {
                                        required: "Введіть ініціали (ПІБ)",
                                        minLength: {
                                            value: 8,
                                            message: "Мінімум 8 символів",
                                        },
                                        pattern: {
                                            value: /^[А-ЯІЇЄҐA-Z][а-яіїєґa-z']+\s[А-ЯІЇЄҐA-Z][а-яіїєґa-z']+\s[А-ЯІЇЄҐA-Z][а-яіїєґa-z']+$/,
                                            message:
                                                "Формат: Прізвище Ім’я По батькові (три слова з великої літери)",
                                        },
                                    })}
                                    errorMessage={errors.fullName?.message}
                                />
                                <InputField
                                    label="Номер телефону*"
                                    {...register("phoneNumber", {
                                        required: "Введіть номер телефону",
                                        pattern: {
                                            value: /^(0\d{9}|380\d{9})$/,
                                            message:
                                                "Формат: 0XXXXXXXXX або 380XXXXXXXXX",
                                        },
                                    })}
                                    errorMessage={errors.phoneNumber?.message}
                                />

                                <InputField
                                    label="Електронна пошта*"
                                    {...register("email", {
                                        pattern: {
                                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            message: "Некоректний формат пошти",
                                        },
                                    })}
                                    errorMessage={errors.email?.message}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-[15px]">
                            <div className="text-lg">Адреса доставки</div>
                            <Controller
                                name="area"
                                control={control}
                                rules={{ required: "Оберіть область" }}
                                render={({ field }) => (
                                    <div className="flex flex-col gap-[7px]">
                                        <Label>Область*</Label>
                                        <select
                                            {...field}
                                            onChange={(e) => {
                                                const areaObj = areas.find(
                                                    (a) =>
                                                        a.Description ===
                                                        e.target.value
                                                );
                                                setSelectedArea(
                                                    areaObj || null
                                                );
                                                field.onChange(e);
                                            }}
                                            value={
                                                selectedArea?.Description || ""
                                            }
                                            className={`border rounded px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer ${
                                                errors.area
                                                    ? "border-red-500"
                                                    : "border-white/10"
                                            }`}
                                        >
                                            <option value="">
                                                Оберіть область
                                            </option>
                                            {areas.map((area) => (
                                                <option
                                                    key={area.Ref}
                                                    value={area.Description}
                                                >
                                                    {area.Description}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.area && (
                                            <span className="text-sm text-red-500">
                                                {errors.area.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name="city"
                                control={control}
                                rules={{ required: "Оберіть місто" }}
                                render={({ field }) => (
                                    <div className="flex flex-col gap-[7px]">
                                        <Label>Місто</Label>
                                        <select
                                            {...field}
                                            onChange={(e) => {
                                                const cityObj = cities.find(
                                                    (c) =>
                                                        c.Description ===
                                                        e.target.value
                                                );
                                                setSelectedCity(
                                                    cityObj || null
                                                );
                                                field.onChange(e);
                                            }}
                                            value={
                                                selectedCity?.Description || ""
                                            }
                                            className={`border rounded px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer ${
                                                errors.city
                                                    ? "border-red-500"
                                                    : "border-white/10"
                                            }`}
                                        >
                                            <option value="">
                                                Оберіть місто
                                            </option>
                                            {cities.map((city) => (
                                                <option
                                                    key={city.Ref}
                                                    value={city.Description}
                                                >
                                                    {city.Description}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.city && (
                                            <span className="text-sm text-red-500">
                                                {errors.city.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            />

                            <Controller
                                name="postDepartment"
                                control={control}
                                rules={{
                                    required: "Оберіть відділення/поштомат",
                                }}
                                render={({ field }) => (
                                    <div className="flex flex-col gap-[7px]">
                                        <Label>Відділення/поштомат</Label>
                                        <select
                                            {...field}
                                            onChange={(e) => {
                                                const warehouseObj =
                                                    warehouses.find(
                                                        (w) =>
                                                            w.Description ===
                                                            e.target.value
                                                    );
                                                setSelectedWarehouse(
                                                    warehouseObj || null
                                                );
                                                field.onChange(e);
                                            }}
                                            value={
                                                selectedWarehouse?.Description ||
                                                ""
                                            }
                                            className={`border rounded px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer ${
                                                errors.postDepartment
                                                    ? "border-red-500"
                                                    : "border-white/10"
                                            }`}
                                        >
                                            <option value="">
                                                Оберіть відділення
                                            </option>
                                            {warehouses.map((wh) => (
                                                <option
                                                    key={wh.Ref}
                                                    value={wh.Description}
                                                >
                                                    {wh.Description}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.postDepartment && (
                                            <span className="text-sm text-red-500">
                                                {errors.postDepartment.message}
                                            </span>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                        <div className="flex flex-col gap-[15px]">
                            <div className="text-lg">
                                Інформація про замовлення
                            </div>
                            <div className="flex flex-col gap-[15px]">
                                <InputField
                                    label="Додаткова інформація*"
                                    {...register("additionalInfo")}
                                />

                                <Controller
                                    name="status"
                                    control={control}
                                    rules={{
                                        required: "Оберіть статус",
                                        validate: (value) =>
                                            value !== null ||
                                            "Оберіть статус зі списку",
                                    }}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-[7px]">
                                            <Label>Статус</Label>
                                            <select
                                                {...field}
                                                id="status"
                                                className={`border border-white/10 rounded px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer ${
                                                    errors.status
                                                        ? "border-red-500"
                                                        : ""
                                                }`}
                                            >
                                                <option
                                                    value=""
                                                    disabled
                                                    hidden
                                                >
                                                    Оберіть статус
                                                </option>
                                                {statusOptions.map((s) => (
                                                    <option key={s} value={s}>
                                                        {s}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.status && (
                                                <span className="text-sm text-red-500">
                                                    {errors.status.message}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </FormFillingWrapper>
                {modalMessage && (
                    <p className="text-red-500 text-sm">{modalMessage}</p>
                )}
                <FormButtonsWrapper>
                    <MonoButton
                        type="button"
                        onClick={() => {
                            reset();
                            setModalMessage("");
                            onClose();
                        }}
                        disabled={
                            useUpdateOrderMutation.isPending ||
                            useUpdateOrderMutation.isPending
                        }
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={
                            useUpdateOrderMutation.isPending ||
                            useUpdateOrderMutation.isPending
                        }
                    >
                        {useUpdateOrderMutation.isPending ||
                        useUpdateOrderMutation.isPending
                            ? "Завантаження..."
                            : "Зберегти"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
