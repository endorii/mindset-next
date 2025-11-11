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
import { useChangePassword } from "../hooks/useUsers";

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormValues = {
    oldPassword: string;
    newPassword: string;
};

export function ChangePasswordModal({
    isOpen,
    onClose,
}: ChangePasswordModalProps) {
    const [modalMessage, setModalMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
    });

    const changePasswordMutation = useChangePassword();

    const handleClose = () => {
        reset();
        setModalMessage("");
        onClose();
    };

    const onSubmit = async (data: FormValues) => {
        try {
            await changePasswordMutation.mutateAsync({
                oldPassword: data.oldPassword,
                newPassword: data.newPassword,
            });
            handleClose();
        } catch (err: any) {
            setModalMessage(err?.message || "Помилка при зміні паролю");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Зміна паролю"}>
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-2 gap-[15px]">
                        <InputField
                            label={"Старий пароль*"}
                            type="password"
                            {...register("oldPassword", {
                                required: "Введіть пароль",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Пароль повинен містити щонайменше 8 символів",
                                },
                                maxLength: {
                                    value: 32,
                                    message:
                                        "Пароль не повинен перевищувати 32 символи",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "Пароль має містити літери та цифри",
                                },
                            })}
                            errorMessage={errors.oldPassword?.message}
                        />
                        <InputField
                            label={"Новий пароль*"}
                            type="password"
                            {...register("newPassword", {
                                required: "Введіть пароль",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Пароль повинен містити щонайменше 8 символів",
                                },
                                maxLength: {
                                    value: 32,
                                    message:
                                        "Пароль не повинен перевищувати 32 символи",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "Пароль має містити літери та цифри",
                                },
                            })}
                            errorMessage={errors.newPassword?.message}
                        />
                    </div>
                </FormFillingWrapper>
                {modalMessage && (
                    <p className="text-red-500 text-sm">{modalMessage}</p>
                )}
                <FormButtonsWrapper>
                    <MonoButton
                        type="button"
                        onClick={handleClose}
                        disabled={changePasswordMutation.isPending}
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={changePasswordMutation.isPending}
                    >
                        {changePasswordMutation.isPending
                            ? "Завантаження..."
                            : "Змінити"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
