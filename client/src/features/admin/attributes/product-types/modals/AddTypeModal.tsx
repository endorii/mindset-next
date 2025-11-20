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
import { useCreateType } from "../hooks/useTypes";

interface AddTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormValues = {
    name: string;
};

export function AddTypeModal({ isOpen, onClose }: AddTypeModalProps) {
    const createTypeMutation = useCreateType();
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
            await createTypeMutation.mutateAsync({ name: data.name });
            handleClose();
        } catch (error: any) {
            setModalMessage(error?.message || "Error adding type");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={handleClose} modalTitle={"Adding a type"}>
            <form
                className="flex flex-col gap-[10px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="flex flex-col gap-[15px] w-full">
                        <InputField
                            label={"Name*"}
                            placeholder={"Type name"}
                            type={"text"}
                            {...register("name", {
                                required: "Enter type name",
                                minLength: {
                                    value: 1,
                                    message:
                                        "Name must contain at least 1 character",
                                },
                                maxLength: {
                                    value: 25,
                                    message:
                                        "Name cannot exceed 25 characters.",
                                },
                            })}
                            errorMessage={errors.name?.message}
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
                        disabled={createTypeMutation.isPending}
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={createTypeMutation.isPending}
                    >
                        {createTypeMutation.isPending ? "Loading..." : "Add"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
