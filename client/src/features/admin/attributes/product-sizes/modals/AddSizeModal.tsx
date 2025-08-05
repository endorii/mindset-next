"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import InputField from "@/shared/ui/inputs/InputField";
import {
    ModalWrapper,
    FormFillingWrapper,
    FormButtonsWrapper,
} from "@/shared/ui/wrappers";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateSize } from "../hooks/useSizes";

interface AddSizeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormValues = {
    name: string;
};

export default function AddSizeModal({ isOpen, onClose }: AddSizeModalProps) {
    const createSizeMutation = useCreateSize();
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
            await createSizeMutation.mutateAsync({ name: data.name });
            toast.success("Розмір успішно додано!");
            handleClose();
        } catch (error: any) {
            setModalMessage(error?.message || "Помилка при додаванні розміру");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={handleClose} modalTitle={"Додавання розміру"}>
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="flex flex-col gap-[15px] w-full">
                        <InputField
                            label={"Назва*"}
                            placeholder={"Назва розміру"}
                            type={"text"}
                            {...register("name", {
                                required: "Введіть назву",
                                minLength: {
                                    value: 1,
                                    message:
                                        "Назва повинна містити хоча б 1 символ",
                                },
                                maxLength: {
                                    value: 25,
                                    message:
                                        "Назва не може перевищувати 25 символів",
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
                    <MonoButton
                        type="button"
                        onClick={handleClose}
                        disabled={createSizeMutation.isPending}
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={createSizeMutation.isPending}
                    >
                        {createSizeMutation.isPending
                            ? "Завантаження..."
                            : "Додати"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
