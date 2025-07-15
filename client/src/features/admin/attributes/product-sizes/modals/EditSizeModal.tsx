"use client";

import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import InputField from "@/shared/ui/inputs/InputField";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useEditSize } from "../hooks/useSizes";
import { ISize } from "../types/product-size.types";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditSizeProps {
    isOpen: boolean;
    onClose: () => void;
    size: ISize;
}

type FormValues = {
    name: string;
};

export default function EditSizeModal({
    isOpen,
    onClose,
    size,
}: EditSizeProps) {
    const editSizeMutation = useEditSize();
    const [modalMessage, setModalMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    useEffect(() => {
        if (size) {
            reset({ name: size.name || "" });
            setModalMessage("");
        }
    }, [size, reset]);

    const onSubmit = async (data: FormValues) => {
        try {
            await editSizeMutation.mutateAsync({
                sizeId: size.id,
                data: data,
            });
            toast.success("Розмір успішно оновлено!");
            onClose();
        } catch (error: any) {
            setModalMessage(
                error?.message || "Помилка при редагуванні розміру"
            );
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !size) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Редагування розміру"}>
            <form
                className="flex flex-col gap-[20px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="flex flex-col gap-[20px] w-full">
                        <InputField
                            label={"Назва"}
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
                        onClick={onClose}
                        disabled={editSizeMutation.isPending}
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={editSizeMutation.isPending}
                    >
                        {editSizeMutation.isPending
                            ? "Завантаження..."
                            : "Підтвердити"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
