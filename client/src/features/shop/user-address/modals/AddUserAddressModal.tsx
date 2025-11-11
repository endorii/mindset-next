"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { InputField } from "@/shared/ui/inputs/InputField";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { IUser } from "../../user-info/types/user.types";
import { useCreateUserAddress } from "../hooks/useUserAddress";

interface AddUserAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: IUser["id"];
}

type FormValues = {
    recipient: string;
    country: string;
    region: string;
    city: string;
    postalCode: string;
    street: string;
    building: string;
    apartment: string;
};

export function AddUserAddressModal({
    isOpen,
    onClose,
    userId,
}: AddUserAddressModalProps) {
    const createUserAddressMutation = useCreateUserAddress();
    const [modalMessage, setModalMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const handleClose = () => {
        reset();
        setModalMessage("");
        onClose();
    };

    const onSubmit = async (data: FormValues) => {
        try {
            await createUserAddressMutation.mutateAsync({
                userId,
                ...data,
            });
            handleClose();
        } catch (error: any) {
            console.error("Помилка при додаванні адреси доставки:", error);
            setModalMessage(error?.message || "Сталася помилка");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper
            onClose={handleClose}
            modalTitle={"Додавання адреси доставки"}
        >
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <InputField
                            label={"Одержувач (ПІБ)*"}
                            placeholder={"Іванов Іван Іванович"}
                            type="text"
                            {...register("recipient", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.recipient?.message}
                        />
                        <InputField
                            label={"Країна*"}
                            placeholder={"Україна"}
                            type="text"
                            {...register("country", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.country?.message}
                        />
                        <InputField
                            label={"Область*"}
                            placeholder={"Київська"}
                            type="text"
                            {...register("region", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.region?.message}
                        />
                        <InputField
                            label={"Місто*"}
                            placeholder={"Київ"}
                            type="text"
                            {...register("city", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.city?.message}
                        />
                        <InputField
                            label={"Вулиця*"}
                            placeholder={"Степана Бандери"}
                            type="text"
                            {...register("street", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.street?.message}
                        />
                        <InputField
                            label={"Будинок*"}
                            placeholder={"45"}
                            type="text"
                            {...register("building", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.building?.message}
                        />
                        <InputField
                            label={"Номер квартири/будинку*"}
                            placeholder={"12"}
                            type="text"
                            {...register("apartment", {
                                required: "Обов'язкове поле",
                            })}
                            errorMessage={errors.apartment?.message}
                        />
                        <InputField
                            label={"Поштовий індекс*"}
                            placeholder={"01001"}
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
                    <MonoButton type="button" onClick={handleClose}>
                        Скасувати
                    </MonoButton>
                    <MonoButton type="submit">
                        {createUserAddressMutation.isPending
                            ? "Завантаження..."
                            : "Підтвердити"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
