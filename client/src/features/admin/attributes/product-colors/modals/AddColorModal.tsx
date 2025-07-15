"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import InputField from "@/shared/ui/inputs/InputField";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useCreateColor } from "../hooks/useColors";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddColorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormValues = {
    name: string;
    hexCode: string;
};

export default function AddColorModal({ isOpen, onClose }: AddColorModalProps) {
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
            toast.success("Колір упішно додано!");
        } catch (err: any) {
            setModalMessage(err?.message || "Помилка при додаванні кольору");
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
            modalTitle={"Додавання кольору"}
        >
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
                        onClick={handleClose}
                        type="button"
                        disabled={createColorMutation.isPending}
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={createColorMutation.isPending}
                    >
                        {createColorMutation.isPending
                            ? "Завантаження..."
                            : "Додати"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
