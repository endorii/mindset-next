"use client";

import {
    fetchAreas,
    fetchCities,
    fetchWarehouses,
} from "@/shared/api/nova-post.api";
import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
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
                console.error("Error loading areas:", error);
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
                    console.error("Error loading cities:", error);
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
                    console.error("Error loading branches:", err);
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
            setModalMessage(err?.message || "Error while editing order");
        }
    };

    if (!isOpen || !order) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Editing an order"}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[10px]"
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <div className="flex flex-col gap-[10px]">
                            <div className="text-lg">Contact information</div>
                            <div className="flex flex-col gap-[15px]">
                                <InputField
                                    label="Full name*"
                                    placeholder="Ivanov Ivan Ivanovych"
                                    {...register("fullName", {
                                        required: "Enter full name",
                                        minLength: {
                                            value: 8,
                                            message: "Minimum 8 characters",
                                        },
                                        pattern: {
                                            value: /^[А-ЯІЇЄҐA-Z][а-яіїєґa-z']+\s[А-ЯІЇЄҐA-Z][а-яіїєґa-z']+\s[А-ЯІЇЄҐA-Z][а-яіїєґa-z']+$/,
                                            message:
                                                "Format: Last Name First Name Middle Name (three words in capital letters)",
                                        },
                                    })}
                                    errorMessage={errors.fullName?.message}
                                />
                                <InputField
                                    label="Phone number*"
                                    {...register("phoneNumber", {
                                        required: "Enter your phone number",
                                        pattern: {
                                            value: /^(0\d{9}|380\d{9})$/,
                                            message:
                                                "Format: 0XXXXXXXXX or 380XXXXXXXXX",
                                        },
                                    })}
                                    errorMessage={errors.phoneNumber?.message}
                                />

                                <InputField
                                    label="E-mail*"
                                    {...register("email", {
                                        pattern: {
                                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                            message: "Incorrect mail format",
                                        },
                                    })}
                                    errorMessage={errors.email?.message}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <div className="text-lg">Delivery address</div>
                            <Controller
                                name="area"
                                control={control}
                                rules={{ required: "Choose an area" }}
                                render={({ field }) => (
                                    <div className="flex flex-col gap-[3px]">
                                        <Label>Region*</Label>
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
                                            className={`border px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer ${
                                                errors.area
                                                    ? "border-red-500"
                                                    : "border-white/5"
                                            }`}
                                        >
                                            <option value="">
                                                Choose an area
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
                                rules={{ required: "Choose a city" }}
                                render={({ field }) => (
                                    <div className="flex flex-col gap-[3px]">
                                        <Label>City</Label>
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
                                            className={`border px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer ${
                                                errors.city
                                                    ? "border-red-500"
                                                    : "border-white/5"
                                            }`}
                                        >
                                            <option value="">
                                                Choose a city
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
                                    required: "Choose a branch/post office",
                                }}
                                render={({ field }) => (
                                    <div className="flex flex-col gap-[3px]">
                                        <Label>Branch/post office</Label>
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
                                            className={`border px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer ${
                                                errors.postDepartment
                                                    ? "border-red-500"
                                                    : "border-white/5"
                                            }`}
                                        >
                                            <option value="">
                                                Choose a branch
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
                        <div className="flex flex-col gap-[10px]">
                            <div className="text-lg">Order information</div>
                            <div className="flex flex-col gap-[10px]">
                                <InputField
                                    label="Additional information*"
                                    {...register("additionalInfo")}
                                />

                                <Controller
                                    name="status"
                                    control={control}
                                    rules={{
                                        required: "Choose a status",
                                        validate: (value) =>
                                            value !== null ||
                                            "Choose a status from the list",
                                    }}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-[3px]">
                                            <Label>Status</Label>
                                            <select
                                                {...field}
                                                id="status"
                                                className={`border border-white/5 px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer ${
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
                                                    Choose a status
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
                    <MonoButtonUnderlined
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
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={
                            useUpdateOrderMutation.isPending ||
                            useUpdateOrderMutation.isPending
                        }
                    >
                        {useUpdateOrderMutation.isPending ||
                        useUpdateOrderMutation.isPending
                            ? "Loading..."
                            : "Save"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
