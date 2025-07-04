"use client";

import { useDeleteColor } from "../hooks/useColors";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { IColor } from "../types/product-color.types";
import { createPortal } from "react-dom";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import DeleteButton from "@/shared/ui/buttons/DeleteButton";

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
        <div
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-black rounded-xl text-white bg-gradient-to-br from-black/0 to-white/5 border border-white/10 p-[30px] max-h-[80vh] shadow-lg w-[24vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-3xl font-thin mb-6">
                    Підтвердження видалення
                </h2>
                <p className="mb-8 text-lg">
                    Ви дійсно хочете видалити колір{" "}
                    <span className="font-semibold">{color.name}</span>?
                </p>
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
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
