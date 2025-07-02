"use client";

import { useDeleteColor } from "../hooks/useColors";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { IColor } from "../types/product-color.types";
import { createPortal } from "react-dom";

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
                    <button
                        onClick={onClose}
                        disabled={deleteColorMutation.isPending}
                        className="px-[20px] py-[7px] border border-white/10 rounded-xl hover:bg-white hover:text-black hover:border-black cursor-pointer transition-all duration-300"
                    >
                        Скасувати
                    </button>
                    <button
                        onClick={() => {
                            handleDelete();
                            onClose();
                        }}
                        disabled={deleteColorMutation.isPending}
                        className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer border border-red-950 bg-red-900 rounded-xl hover:bg-red-700 group transition-all duration-300 hover:text-white"
                    >
                        {deleteColorMutation.isPending
                            ? "Видалення..."
                            : "Видалити"}
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
