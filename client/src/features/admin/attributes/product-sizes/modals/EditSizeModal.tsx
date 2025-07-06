"use client";

import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import InputField from "@/shared/ui/inputs/InputField";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useEditSize } from "../hooks/useSizes";
import { ISize } from "../types/product-size.types";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";

interface EditSizeProps {
    isOpen: boolean;
    onClose: () => void;
    size: ISize;
}

export default function EditSizeModal({
    isOpen,
    onClose,
    size,
}: EditSizeProps) {
    const [name, setName] = useState("");

    const editSizeMutation = useEditSize();

    useEffect(() => {
        if (size) {
            setName(size.name || "");
        }
    }, [size]);

    useEscapeKeyClose({ isOpen, onClose });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await editSizeMutation.mutateAsync({
                sizeId: size.id,
                data: {
                    name,
                },
            });

            onClose();
            console.log("Відправлено на редагування");
        } catch (error) {
            console.error("Помилка при редагуванні розміру:", error);
        }
    };

    if (!isOpen || !size) return null;
    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Редагування розміру"}>
            <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
                <FormFillingWrapper>
                    <div className="flex flex-col gap-[20px] w-full">
                        <InputField
                            label={"Назва"}
                            value={name}
                            onChangeValue={(e) => setName(e.target.value)}
                            id={"name"}
                            name={"name"}
                            placeholder={"Назва розміру"}
                            type={"text"}
                        />
                    </div>
                </FormFillingWrapper>

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
