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
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useEditColor } from "../hooks/useColors";
import { IColor } from "../types/product-color.types";

interface EditColorProps {
    isOpen: boolean;
    onClose: () => void;
    color: IColor;
}

type FormValues = {
    name: string;
    hexCode: string;
};

export function EditColorModal({ isOpen, onClose, color }: EditColorProps) {
    const [modalMessage, setModalMessage] = useState("");

    const editColorMutation = useEditColor();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>();

    useEffect(() => {
        if (color) {
            reset({
                name: color.name || "",
                hexCode: color.hexCode || "#",
            });
            setModalMessage("");
        }
    }, [color, reset]);

    const onSubmit = async (data: FormValues) => {
        try {
            await editColorMutation.mutateAsync({
                colorId: color.id,
                data,
            });
            onClose();
        } catch (err: any) {
            setModalMessage(err?.message || "Error while editing color");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !color) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Color editing"}>
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
                        type="button"
                        onClick={onClose}
                        disabled={editColorMutation.isPending}
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={editColorMutation.isPending}
                    >
                        {editColorMutation.isPending ? "Loading..." : "Sumbit"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
