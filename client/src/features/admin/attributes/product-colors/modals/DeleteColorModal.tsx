"use client";

import { useDeleteColor } from "../hooks/useColors";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { IColor } from "../types/product-color.types";
import { createPortal } from "react-dom";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import DeleteButton from "@/shared/ui/buttons/DeleteButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";

interface DeleteColorModalProps {
    isOpen: boolean;
    onClose: () => void;
    color: IColor;
}

export default function DeleteColorModal({
    isOpen,
    onClose,
    color,
}: DeleteColorModalProps) {
    if (!isOpen) return null;

    const deleteColorMutation = useDeleteColor();

    const handleDelete = async () => {
        try {
            await deleteColorMutation.mutateAsync(color.id);
        } catch (error) {
            console.error("Помилка при видаленні:", error);
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Видалення кольору"}>
            <div className="mb-8 text-lg">
                Ви дійсно хочете видалити колір{" "}
                <span className="font-semibold">{color.name}</span>?
            </div>
            <div className="flex justify-end gap-4">
                <MonoButton
                    onClick={onClose}
                    disabled={deleteColorMutation.isPending}
                >
                    Скасувати
                </MonoButton>
                <DeleteButton
                    onClick={() => {
                        handleDelete();
                        onClose();
                    }}
                    disabled={deleteColorMutation.isPending}
                >
                    {deleteColorMutation.isPending
                        ? "Видалення..."
                        : "Видалити"}
                </DeleteButton>
            </div>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
