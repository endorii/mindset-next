"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { InputField } from "@/shared/ui/inputs/InputField";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useEditUser } from "../hooks/useUsers";
import { IUser } from "../types/user.types";

interface EditUserInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: IUser | null | undefined;
}

type EditUserFormData = {
    userName: string;
    email: string;
    phone: string;
};

export function EditUserInfoModal({
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
                userName: user.userName || "",
                email: user.email || "",
                phone: user.phone || "",
            });
            setModalMessage("");
        }
    }, [user, reset]);

    const onSubmit = async (data: EditUserFormData) => {
        try {
            await editUserMutation.mutateAsync({
                userName: data.userName,
                email: data.email,
                phone: data.phone,
            });
            onClose();
        } catch (err: any) {
            setModalMessage(err?.message || "Error editing information");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !user) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Edit user information"}>
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <InputField
                            label="Username*"
                            type="text"
                            {...register("userName", {
                                required: "Enter username",
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters",
                                },
                                maxLength: {
                                    value: 15,
                                    message: "Maximum 15 characters",
                                },
                                pattern: {
                                    value: /^[A-Za-z0-9]+$/,
                                    message:
                                        "Only English letters and numbers are allowed",
                                },
                            })}
                            errorMessage={modalErrors.userName?.message}
                        />
                        <InputField
                            label="E-mail*"
                            type="email"
                            {...register("email", {
                                required: "Enter e-mail",
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Incorrect e-mail format",
                                },
                            })}
                            errorMessage={modalErrors.email?.message}
                        />
                        <InputField
                            label="Phone number*"
                            type="tel"
                            placeholder="+380 XX XXX XX XX"
                            {...register("phone", {
                                required: "Enter phone number",
                                pattern: {
                                    value: /^\+?[\d\s\-]{10,15}$/,
                                    message: "Incorrect phone number",
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
                    <MonoButton onClick={onClose}>Cancel</MonoButton>
                    <MonoButton type="submit">Confirm</MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
