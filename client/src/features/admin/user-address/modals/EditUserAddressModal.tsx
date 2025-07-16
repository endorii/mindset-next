"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useEditUserAddress } from "../hooks/useUserAddress";
import InputField from "@/shared/ui/inputs/InputField";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import { IUserShippingAdress } from "../../user-info/types/user.types";
import { toast } from "sonner";

interface EditUserAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    address: IUserShippingAdress | undefined;
}

interface FormInputs {
    recipient: string;
    country: string;
    region: string;
    city: string;
    postalCode: string;
    street: string;
    building: string;
    apartment: string;
}

export default function EditUserAddressModal({
    isOpen,
    onClose,
    address,
}: EditUserAddressModalProps) {
    const editUserAddress = useEditUserAddress();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormInputs>({
        defaultValues: {
            recipient: "",
            country: "",
            region: "",
            city: "",
            postalCode: "",
            street: "",
            building: "",
            apartment: "",
        },
    });

    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        if (address) {
            reset({
                recipient: address.recipient || "",
                country: address.country || "",
                region: address.region || "",
                city: address.city || "",
                postalCode: address.postalCode || "",
                street: address.street || "",
                building: address.building || "",
                apartment: address.apartment || "",
            });
            setModalMessage("");
        }
    }, [address, reset]);

    const onSubmit = async (data: FormInputs) => {
        try {
            await editUserAddress.mutateAsync({
                userId: address?.userId || "",
                data,
            });
            onClose();
            toast.success("Адресу успішно відредаговано!");
        } catch (err: any) {
            setModalMessage(
                err?.message || "Помилка редагування адреси доставки"
            );
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !address) return null;

    const modalContent = (
        <ModalWrapper
            onClose={onClose}
            modalTitle={"Редагування адреси доставки"}
        >
            <form
                className="flex flex-col gap-[20px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InputField
                            label="Одержувач (ПІБ)"
                            type="text"
                            {...register("recipient", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.recipient?.message}
                        />
                        <InputField
                            label="Країна"
                            type="text"
                            {...register("country", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.country?.message}
                        />
                        <InputField
                            label="Область"
                            type="text"
                            {...register("region", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.region?.message}
                        />
                        <InputField
                            label="Місто"
                            type="text"
                            {...register("city", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.city?.message}
                        />
                        <InputField
                            label="Вулиця"
                            type="text"
                            {...register("street", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.street?.message}
                        />
                        <InputField
                            label="Будинок"
                            type="text"
                            {...register("building", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.building?.message}
                        />
                        <InputField
                            label="Номер квартири/будинку"
                            type="text"
                            {...register("apartment", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.apartment?.message}
                        />
                        <InputField
                            label="Поштовий індекс"
                            type="text"
                            {...register("postalCode", {
                                required: "Обов'язкове поле",
                                pattern: {
                                    value: /^\d{5}$/,
                                    message: "Має бути рівно 5 цифр",
                                },
                            })}
                            errorMessage={errors.postalCode?.message}
                        />
                    </div>
                </FormFillingWrapper>
                {modalMessage && (
                    <p className="text-red-500 text-sm">{modalMessage}</p>
                )}
                <FormButtonsWrapper>
                    <MonoButton onClick={onClose}>Скасувати</MonoButton>
                    <MonoButton type="submit">Підтвердити</MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
