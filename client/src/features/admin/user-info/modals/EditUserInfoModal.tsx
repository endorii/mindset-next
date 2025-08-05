"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import InputField from "@/shared/ui/inputs/InputField";
import {
    ModalWrapper,
    FormFillingWrapper,
    FormButtonsWrapper,
} from "@/shared/ui/wrappers";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useEditUser } from "../hooks/useUsers";
import { IUser } from "../types/user.types";

interface EditUserInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: IUser | undefined;
}

type EditUserFormData = {
    name: string;
    email: string;
    phone: string;
};

export default function EditUserInfoModal({
    isOpen,
    onClose,
    user,
}: EditUserInfoModalProps) {
    const editUserMutation = useEditUser();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors: modalErrors },
    } = useForm<EditUserFormData>();

    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        if (user) {
            reset({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
            });
            setModalMessage("");
        }
    }, [user, reset]);

    const onSubmit = async (data: EditUserFormData) => {
        try {
            await editUserMutation.mutateAsync({
                id: user?.id || "",
                data: {
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                },
            });
            onClose();
            toast.success("Інформацію успішно відредаговано!");
        } catch (err: any) {
            setModalMessage(err?.message || "Помилка редагування інформації");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !user) return null;

    const modalContent = (
        <ModalWrapper
            onClose={onClose}
            modalTitle={"Редагування інформації користувача"}
        >
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <InputField
                            label="Нікнейм*"
                            type="text"
                            {...register("name", {
                                required: "Введіть нікнейм",
                                minLength: {
                                    value: 3,
                                    message: "Мінімум 3 символи",
                                },
                                maxLength: {
                                    value: 15,
                                    message: "Максимум 15 символів",
                                },
                                pattern: {
                                    value: /^[A-Za-z0-9]+$/,
                                    message:
                                        "Дозволено лише англійські літери та цифри",
                                },
                            })}
                            errorMessage={modalErrors.name?.message}
                        />
                        <InputField
                            label="Електронна пошта*"
                            type="email"
                            {...register("email", {
                                required: "Введіть email",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Некоректний формат email",
                                },
                            })}
                            errorMessage={modalErrors.email?.message}
                        />
                        <InputField
                            label="Номер телефону*"
                            type="tel"
                            {...register("phone", {
                                required: "Введіть номер телефону",
                                pattern: {
                                    value: /^\+?[\d\s\-]{10,15}$/,
                                    message: "Некоректний номер телефону",
                                },
                            })}
                            errorMessage={modalErrors.phone?.message}
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
