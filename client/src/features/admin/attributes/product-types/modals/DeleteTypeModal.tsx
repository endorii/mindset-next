"use client";

import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useDeleteType } from "../hooks/useTypes";
import { IType } from "../types/product-type.types";
import { createPortal } from "react-dom";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import DeleteButton from "@/shared/ui/buttons/DeleteButton";

interface DeleteTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: IType;
}

export default function DeleteTypeModal({
    isOpen,
    onClose,
    type,
}: DeleteTypeModalProps) {
    if (!isOpen) return null;

    const deleteTypeMutation = useDeleteType();

    const handleDelete = async () => {
        try {
            await deleteTypeMutation.mutateAsync(type.id);
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
                    Ви дійсно хочете видалити тип {type?.name}?
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
