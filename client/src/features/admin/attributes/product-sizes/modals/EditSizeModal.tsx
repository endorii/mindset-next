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
import { useEditSize } from "../hooks/useSizes";
import { ISize } from "../types/product-size.types";

interface EditSizeProps {
    isOpen: boolean;
    onClose: () => void;
    size: ISize;
}

type FormValues = {
    name: string;
};

export function EditSizeModal({ isOpen, onClose, size }: EditSizeProps) {
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
            onClose();
        } catch (error: any) {
            setModalMessage(error?.message || "Error editing size");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !size) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Size editing"}>
            <form
                className="flex flex-col gap-[10px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="flex flex-col gap-[15px] w-full">
                        <InputField
                            label={"Name*"}
                            placeholder={"Size name"}
                            type={"text"}
                            {...register("name", {
                                required: "Enter size name",
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
                        onClick={onClose}
                        disabled={editSizeMutation.isPending}
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={editSizeMutation.isPending}
                    >
                        {editSizeMutation.isPending ? "Loading..." : "Confirm"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
