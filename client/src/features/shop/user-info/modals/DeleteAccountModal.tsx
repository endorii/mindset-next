"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton, MonoButton } from "@/shared/ui/buttons";
import { InputField } from "@/shared/ui/inputs/InputField";
import { FormButtonsWrapper, ModalWrapper } from "@/shared/ui/wrappers";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useDeleteUser } from "../hooks/useUsers";

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormValues = {
    password: string;
};

export function DeleteAccountModal({
    isOpen,
    onClose,
}: DeleteAccountModalProps) {
    const [modalMessage, setModalMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            password: "",
        },
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
            setModalMessage("");
        }
    }, [isOpen, reset]);

    const deleteAccountMutation = useDeleteUser();

    const handleDelete = async (data: FormValues) => {
        try {
            await deleteAccountMutation.mutateAsync(data.password);
            onClose();
        } catch (err: any) {
            setModalMessage(err?.message || "Помилка при зміні паролю");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Видалення акаунту"}>
            <form onSubmit={handleSubmit(handleDelete)}>
                <div className="mb-6 text-white/80 text-[16px]">
                    Ви дійсно хочете видалити ваш акаунт?
                </div>
                <div className="mb-6 text-white/80 text-[16px] flex flex-col gap-[15px]">
                    <div>Для підтвердження введіть пароль</div>
                    <InputField
                        label={"Пароль*"}
                        type="password"
                        {...register("password", {
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
                                message: "Пароль має містити літери та цифри",
                            },
                        })}
                        errorMessage={errors.password?.message}
                    />
                </div>
                {modalMessage && (
                    <p className="text-red-500 text-sm">{modalMessage}</p>
                )}
                <FormButtonsWrapper>
                    <MonoButton onClick={onClose}>Скасувати</MonoButton>
                    <DeleteButton type="submit">Видалити</DeleteButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
