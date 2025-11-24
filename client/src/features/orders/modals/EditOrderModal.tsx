"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
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
        setValue,
        formState: { errors },
    } = useForm<FormData>();

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

    // LOAD FORM DATA
    useEffect(() => {
        if (!order) return;

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

    // LOAD AREAS
    useEffect(() => {
        const loadAreas = async () => {
            try {
                const fetched = await fetchAreas();
                setAreas(fetched);

                const matched = fetched.find(
                    (a) => a.Description === order.area
                );

                if (matched) {
                    setSelectedArea(matched);
                    setValue("area", matched.Description);
                }
            } catch (error) {
                console.error("Error loading areas:", error);
            }
        };

        loadAreas();
    }, [order.area, setValue]);

    // LOAD CITIES
    useEffect(() => {
        if (!selectedArea?.Ref) return;

        const loadCities = async () => {
            try {
                const fetched = await fetchCities(selectedArea.Ref);
                setCities(fetched);

                const matched = fetched.find(
                    (c) => c.Description === order.city
                );

                if (matched) {
                    setSelectedCity(matched);
                    setValue("city", matched.Description);
                }
            } catch (error) {
                console.error("Error loading cities:", error);
                setCities([]);
            }
        };

        loadCities();

        setSelectedWarehouse(null);
        setWarehouses([]);
    }, [selectedArea, order.city, setValue]);

    // LOAD WAREHOUSES
    useEffect(() => {
        if (!selectedCity?.Ref) return;

        const loadWarehouses = async () => {
            try {
                const fetched = await fetchWarehouses(selectedCity.Ref);
                setWarehouses(fetched);

                const matched = fetched.find(
                    (w) => w.Description === order.postDepartment
                );

                if (matched) {
                    setSelectedWarehouse(matched);
                    setValue("postDepartment", matched.Description);
                }
            } catch (error) {
                console.error("Error loading warehouses:", error);
                setWarehouses([]);
            }
        };

        loadWarehouses();
    }, [selectedCity, order.postDepartment, setValue]);

    const updateOrderMutation = useUpdateOrder();

    const onSubmit = async (data: FormData) => {
        try {
            await updateOrderMutation.mutateAsync({
                orderId: order.id,
                data,
            });

            onClose();
        } catch (err: any) {
            setModalMessage(err?.message || "Error while editing order");
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle="Editing an order">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-3 max-w-[900px]"
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <div className="flex flex-col gap-[10px]">
                            <div className="text-lg">Contact information</div>
                            <div className="flex flex-col gap-[15px]">
                                <InputField
                                    label="Full name*"
                                    register={{
                                        ...register("fullName", {
                                            required: "Enter full name",
                                            pattern: {
                                                value: /^[A-Z][a-z]+ [A-Z][a-z]+ [A-Z][a-z]+$/,
                                                message:
                                                    "Enter your full name in the format: Last Name First Name Patronymic (English letters only)",
                                            },
                                        }),
                                    }}
                                    errorMessage={errors.fullName?.message}
                                />

                                <InputField
                                    label="Phone number*"
                                    placeholder="+380XXXXXXXXX"
                                    register={{
                                        ...register("phoneNumber", {
                                            required: "Enter phone number",
                                            pattern: {
                                                value: /^(?:\+380\d{9}|380\d{9}|0\d{9})$/,
                                                message:
                                                    "Incorrect Ukrainian phone format",
                                            },
                                        }),
                                    }}
                                    errorMessage={errors.phoneNumber?.message}
                                />

                                <InputField
                                    label="E-mail"
                                    {...register("email")}
                                    errorMessage={errors.email?.message}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[10px]">
                            <div className="text-lg">Delivery address</div>
                            <div className="flex flex-col gap-[15px]">
                                <Controller
                                    name="area"
                                    control={control}
                                    rules={{ required: "Choose an area" }}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-[3px]">
                                            <Label>Region*</Label>
                                            <Select
                                                value={field.value || ""}
                                                onValueChange={(value) => {
                                                    const areaObj = areas.find(
                                                        (a) =>
                                                            a.Description ===
                                                            value
                                                    );
                                                    setSelectedArea(
                                                        areaObj || null
                                                    );
                                                    field.onChange(value);
                                                }}
                                            >
                                                <SelectTrigger
                                                    className={`w-full ${
                                                        errors.area
                                                            ? "border-red-500"
                                                            : "border-white/5"
                                                    }`}
                                                >
                                                    <SelectValue placeholder="Choose an area" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {areas.map((a) => (
                                                        <SelectItem
                                                            key={a.Ref}
                                                            value={
                                                                a.Description
                                                            }
                                                        >
                                                            {a.Description}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.area && (
                                                <span className="text-red-500 text-sm">
                                                    {errors.area.message}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                />

                                <Controller
                                    name="city"
                                    control={control}
                                    rules={{ required: "Choose city" }}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-[3px]">
                                            <Label>City*</Label>
                                            <Select
                                                value={field.value || ""}
                                                onValueChange={(value) => {
                                                    const cityObj = cities.find(
                                                        (c) =>
                                                            c.Description ===
                                                            value
                                                    );
                                                    setSelectedCity(
                                                        cityObj || null
                                                    );
                                                    field.onChange(value);
                                                }}
                                            >
                                                <SelectTrigger
                                                    className={`w-full ${
                                                        errors.city
                                                            ? "border-red-500"
                                                            : "border-white/5"
                                                    }`}
                                                >
                                                    <SelectValue placeholder="Choose city" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {cities.map((c) => (
                                                        <SelectItem
                                                            key={c.Ref}
                                                            value={
                                                                c.Description
                                                            }
                                                        >
                                                            {c.Description}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.city && (
                                                <span className="text-red-500 text-sm">
                                                    {errors.city.message}
                                                </span>
                                            )}
                                        </div>
                                    )}
                                />

                                <Controller
                                    name="postDepartment"
                                    control={control}
                                    rules={{ required: "Choose a branch" }}
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-[3px]">
                                            <Label>Branch/post office*</Label>
                                            <Select
                                                value={field.value || ""}
                                                onValueChange={(value) => {
                                                    const whObj =
                                                        warehouses.find(
                                                            (w) =>
                                                                w.Description ===
                                                                value
                                                        );
                                                    setSelectedWarehouse(
                                                        whObj || null
                                                    );
                                                    field.onChange(value);
                                                }}
                                            >
                                                <SelectTrigger
                                                    className={`w-full ${
                                                        errors.postDepartment
                                                            ? "border-red-500"
                                                            : "border-white/5"
                                                    }`}
                                                >
                                                    <SelectValue placeholder="Choose a branch" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {warehouses.map((w) => (
                                                        <SelectItem
                                                            key={w.Ref}
                                                            value={
                                                                w.Description
                                                            }
                                                        >
                                                            {w.Description}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.postDepartment && (
                                                <span className="text-red-500 text-sm">
                                                    {
                                                        errors.postDepartment
                                                            .message
                                                    }
                                                </span>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-[10px]">
                            <div className="text-lg">Order information</div>
                            <Controller
                                name="status"
                                control={control}
                                rules={{
                                    required: "Choose a status",
                                }}
                                render={({ field }) => (
                                    <div className="flex flex-col gap-[3px]">
                                        <Label>Status</Label>

                                        <Select
                                            key={field.value}
                                            value={field.value}
                                            onValueChange={(v) =>
                                                field.onChange(v)
                                            }
                                        >
                                            <SelectTrigger
                                                className={`w-full ${
                                                    errors.status
                                                        ? "border-red-500"
                                                        : "border-white/5"
                                                }`}
                                            >
                                                <SelectValue placeholder="Choose a status" />
                                            </SelectTrigger>

                                            <SelectContent className="bg-black/90 text-white border border-white/5">
                                                {statusOptions.map((s) => (
                                                    <SelectItem
                                                        key={s}
                                                        value={s}
                                                    >
                                                        {s}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>

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
                </FormFillingWrapper>

                {modalMessage && (
                    <p className="text-red-500 text-sm">{modalMessage}</p>
                )}

                <FormButtonsWrapper>
                    <MonoButtonUnderlined
                        type="button"
                        onClick={() => {
                            reset();
                            onClose();
                        }}
                        disabled={updateOrderMutation.isPending}
                    >
                        Cancel
                    </MonoButtonUnderlined>

                    <MonoButton
                        type="submit"
                        disabled={updateOrderMutation.isPending}
                    >
                        {updateOrderMutation.isPending ? "Loading..." : "Save"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
