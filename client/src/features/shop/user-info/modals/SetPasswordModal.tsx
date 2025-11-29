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
import { useSetPassword } from "../hooks/useUsers";

interface SetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormValues = {
    password: string;
    confirmPassword: string;
};

export function SetPasswordModal({ isOpen, onClose }: SetPasswordModalProps) {
    const [modalMessage, setModalMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    const setPasswordMutation = useSetPassword();

    const handleClose = () => {
        reset();
        setModalMessage("");
        onClose();
    };

    const onSubmit = async (data: FormValues) => {
        try {
            await setPasswordMutation.mutateAsync({
                password: data.password,
                confirmPassword: data.confirmPassword,
            });
            handleClose();
        } catch (err: any) {
            setModalMessage(err?.message || "Error while setting password");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Set password"}>
            <form
                className="flex flex-col gap-[10px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-2 gap-[15px]">
                        <InputField
                            label={"Password*"}
                            type="password"
                            {...register("password", {
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
                            errorMessage={errors.password?.message}
                        />
                        <InputField
                            label={"Confirm password*"}
                            type="password"
                            {...register("confirmPassword", {
                                required: "Enter password again",
                                validate: (value) =>
                                    value === watch("password") ||
                                    "Passwords do not match",
                            })}
                            errorMessage={errors.confirmPassword?.message}
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
                        disabled={setPasswordMutation.isPending}
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={setPasswordMutation.isPending}
                    >
                        {setPasswordMutation.isPending ? "Setting..." : "Set"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
