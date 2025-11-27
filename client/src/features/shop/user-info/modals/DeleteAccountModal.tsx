"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
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
            setModalMessage(err?.message || "Error while changing password");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Deletting account"}>
            <form
                onSubmit={handleSubmit(handleDelete)}
                className="flex flex-col gap-[15px]"
            >
                <div className="text-neutral-200 text-[16px] leading-1.6 font-light">
                    Do you really want to Delete your account? Enter password to
                    confirm.
                </div>

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
                            message: "Password must not exceed 32 characters.",
                        },
                        pattern: {
                            value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                "Password must contain letters and numbers",
                        },
                    })}
                    errorMessage={errors.password?.message}
                />

                {modalMessage && (
                    <p className="text-red-500 text-sm">{modalMessage}</p>
                )}
                <FormButtonsWrapper>
                    <MonoButtonUnderlined
                        onClick={onClose}
                        disabled={deleteAccountMutation.isPending}
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <DeleteButton
                        type="submit"
                        disabled={deleteAccountMutation.isPending}
                    >
                        {deleteAccountMutation.isPending
                            ? "Deletting..."
                            : "Delete"}
                    </DeleteButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
