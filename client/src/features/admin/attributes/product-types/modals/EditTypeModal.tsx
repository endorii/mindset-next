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
            setModalMessage(error?.message || "Error editing type");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !type) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Editing type"}>
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
                        onClick={onClose}
                        disabled={editTypeMutation.isPending}
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={editTypeMutation.isPending}
                    >
                        {editTypeMutation.isPending ? "Loading..." : "Confirm"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
