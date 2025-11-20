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
import { useCreateColor } from "../hooks/useColors";

interface AddColorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormValues = {
    name: string;
    hexCode: string;
};

export function AddColorModal({ isOpen, onClose }: AddColorModalProps) {
    const [modalMessage, setModalMessage] = useState("");

    const createColorMutation = useCreateColor();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    const handleClose = () => {
        onClose();
        setModalMessage("");
        reset();
    };

    const onSubmit = async (data: FormValues) => {
        try {
            await createColorMutation.mutateAsync({
                name: data.name,
                hexCode: data.hexCode,
            });
            handleClose();
        } catch (err: any) {
            setModalMessage(err?.message || "Error adding color");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper
            onClose={() => {
                onClose();
                setModalMessage("");
            }}
            modalTitle={"Adding color"}
        >
            <form
                className="flex flex-col gap-[10px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-2 gap-[15px]">
                        <InputField
                            label={"Name*"}
                            placeholder={"Color name"}
                            type={"text"}
                            {...register("name", {
                                required: "Enter name",
                                minLength: {
                                    value: 2,
                                    message:
                                        "The color name must contain at least 2 characters.",
                                },
                                maxLength: {
                                    value: 25,
                                    message:
                                        "The color name cannot exceed 25 characters.",
                                },
                            })}
                            errorMessage={errors.name?.message}
                        />

                        <InputField
                            label={"HEX-code*"}
                            placeholder={"#000000"}
                            type={"text"}
                            {...register("hexCode", {
                                required: "Enter hex-code",
                                validate: (value) => {
                                    if (!value) return true;
                                    const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;
                                    return (
                                        hexRegex.test(value) ||
                                        "Invalid HEX code format. For example: #FF0000 or #FFF."
                                    );
                                },
                            })}
                            errorMessage={errors.hexCode?.message}
                        />
                    </div>
                </FormFillingWrapper>
                {modalMessage && (
                    <p className="text-red-500 text-sm">{modalMessage}</p>
                )}
                <FormButtonsWrapper>
                    <MonoButtonUnderlined
                        onClick={handleClose}
                        type="button"
                        disabled={createColorMutation.isPending}
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={createColorMutation.isPending}
                    >
                        {createColorMutation.isPending ? "Loading..." : "Add"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
