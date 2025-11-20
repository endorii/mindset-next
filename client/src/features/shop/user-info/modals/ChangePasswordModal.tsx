"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
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
            setModalMessage(err?.message || "Error while changing password");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Change password"}>
            <form
                className="flex flex-col gap-[10px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-2 gap-[15px]">
                        <InputField
                            label={"Old password*"}
                            type="password"
                            {...register("oldPassword", {
                                required: "Enter password",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must contain at least 8 characters",
                                },
                                maxLength: {
                                    value: 32,
                                    message:
                                        "Password must not exceed 32 characters.",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "Password must contain letters and numbers",
                                },
                            })}
                            errorMessage={errors.oldPassword?.message}
                        />
                        <InputField
                            label={"New password*"}
                            type="password"
                            {...register("newPassword", {
                                required: "Enter password",
                                minLength: {
                                    value: 8,
                                    message:
                                        "Password must contain at least 8 characters",
                                },
                                maxLength: {
                                    value: 32,
                                    message:
                                        "Password must not exceed 32 characters.",
                                },
                                pattern: {
                                    value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                                    message:
                                        "Password must contain letters and numbers",
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
                    <MonoButtonUnderlined
                        type="button"
                        onClick={handleClose}
                        disabled={changePasswordMutation.isPending}
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={changePasswordMutation.isPending}
                    >
                        {changePasswordMutation.isPending
                            ? "Changing..."
                            : "Change"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
