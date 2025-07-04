"use client";

import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { createPortal } from "react-dom";
import { useDeleteSize } from "../hooks/useSizes";
import { ISize } from "../types/product-size.types";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import DeleteButton from "@/shared/ui/buttons/DeleteButton";

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
        <div
            className="fixed inset-0 bg-black/70 flex items-center products-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-white p-[30px] h-auto max-h-[80vh] shadow-lg w-[24vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold mb-4">
                    Підтвердження видалення
                </h2>
                <p className="mb-6">
                    Ви дійсно хочете видалити розмір {size?.name}?
                </p>
                <div className="flex justify-end gap-4">
                    <MonoButton onClick={onClose}>Скасувати</MonoButton>
                    <DeleteButton
                        onClick={async () => {
                            onClose();
                            handleDelete();
                        }}
                    >
                        Видалити
                    </DeleteButton>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
