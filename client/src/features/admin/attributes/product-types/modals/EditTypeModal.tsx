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
import { useEditType } from "../hooks/useTypes";
import { IType } from "../types/product-type.types";

interface EditTypeProps {
    isOpen: boolean;
    onClose: () => void;
    type: IType;
}

type FormValues = {
    name: string;
};

export function EditTypeModal({ isOpen, onClose, type }: EditTypeProps) {
    const editTypeMutation = useEditType();
    const [modalMessage, setModalMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>();

    useEffect(() => {
        if (type) {
            reset({ name: type.name || "" });
            setModalMessage("");
        }
    }, [type, reset]);

    const onSubmit = async (data: FormValues) => {
        try {
            await editTypeMutation.mutateAsync({
                typeId: type.id,
                data: data,
            });
            onClose();
        } catch (error: any) {
            setModalMessage(error?.message || "Помилка при редагуванні типу");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !type) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Редагування типу"}>
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="flex flex-col gap-[15px] w-full">
                        <InputField
                            label={"Назва*"}
                            placeholder={"Назва типу"}
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
                        disabled={editTypeMutation.isPending}
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={editTypeMutation.isPending}
                    >
                        {editTypeMutation.isPending
                            ? "Завантаження..."
                            : "Підтвердити"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
