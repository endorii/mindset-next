"use client";

import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useDeleteType } from "../hooks/useTypes";
import { IType } from "../types/product-type.types";
import { createPortal } from "react-dom";

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
                    <button
                        onClick={onClose}
                        className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                    >
                        Скасувати
                    </button>
                    <button
                        onClick={async () => {
                            onClose();
                            handleDelete();
                        }}
                        className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                    >
                        Видалити
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
