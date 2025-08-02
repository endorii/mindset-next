"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton, DeleteButton } from "@/shared/ui/buttons";
import { ModalWrapper, FormButtonsWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useDeleteSize } from "../hooks/useSizes";
import { ISize } from "../types/product-size.types";

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
            toast.success("Розмір упішно видалено!");
        } catch (e) {
            toast.error("Помилка при видаленні розміру");
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
