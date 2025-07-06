"use client";

import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { createPortal } from "react-dom";
import { useDeleteSize } from "../hooks/useSizes";
import { ISize } from "../types/product-size.types";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import DeleteButton from "@/shared/ui/buttons/DeleteButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";

interface DeleteSizeModalProps {
    isOpen: boolean;
    onClose: () => void;
    size: ISize;
}

export default function DeleteSizeModal({
    isOpen,
    onClose,
    size,
}: DeleteSizeModalProps) {
    if (!isOpen) return null;

    const deleteSizeMutation = useDeleteSize();

    const handleDelete = async () => {
        try {
            await deleteSizeMutation.mutateAsync(size.id);
        } catch (error) {
            console.error("Помилка при видаленні:", error);
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Видалення розміру"}>
            <div className="mb-6">
                Ви дійсно хочете видалити розмір {size?.name}?
            </div>
            <FormButtonsWrapper>
                <MonoButton onClick={onClose}>Скасувати</MonoButton>
                <DeleteButton
                    onClick={async () => {
                        onClose();
                        handleDelete();
                    }}
                >
                    Видалити
                </DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
