"use client";

import InputField from "@/shared/ui/inputs/InputField";
import { useEditColor } from "../hooks/useColors";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { IColor } from "../types/product-color.types";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

interface EditColorProps {
    isOpen: boolean;
    onClose: () => void;
    color: IColor;
}

type FormValues = {
    name: string;
    hexCode: string;
};

export default function EditColorModal({
    isOpen,
    onClose,
    color,
}: EditColorProps) {
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

            toast.success("Колір успішно відредаговано!");
        } catch (err: any) {
            setModalMessage(err?.message || "Помилка при редагуванні кольору");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !color) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Редагування кольору"}>
            <form
                className="flex flex-col gap-[20px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                        <InputField
                            label={"Назва"}
                            placeholder={"Назва кольору"}
                            type={"text"}
                            {...register("name", {
                                required: "Введіть назву",
                                minLength: {
                                    value: 2,
                                    message:
                                        "Назва кольору повинна містити щонайменше 2 символи.",
                                },
                                maxLength: {
                                    value: 25,
                                    message:
                                        "Назва кольору не може перевищувати 25 символів.",
                                },
                            })}
                            errorMessage={errors.name?.message}
                        />

                        <InputField
                            label={"HEX-код"}
                            placeholder={"#000000"}
                            type={"text"}
                            {...register("hexCode", {
                                required: "Введіть hex-код",
                                validate: (value) => {
                                    if (!value) return true;
                                    const hexRegex = /^#([A-Fa-f0-9]{3}){1,2}$/;
                                    return (
                                        hexRegex.test(value) ||
                                        "Недійсний формат HEX-коду. Наприклад: #FF0000 або #FFF."
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
                    <MonoButton
                        type="button"
                        onClick={onClose}
                        disabled={editColorMutation.isPending}
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={editColorMutation.isPending}
                    >
                        {editColorMutation.isPending
                            ? "Завантаження..."
                            : "Підтвердити"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
