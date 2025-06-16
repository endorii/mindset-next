"use client";

import { deleteImage } from "@/lib/api/images.api";
import { useDeleteCategory } from "@/lib/hooks/useCategories";
import { useEscapeKeyClose } from "@/lib/hooks/useEscapeKeyClose";
import { ICategory } from "@/types/category/category.types";
import { ICollection } from "@/types/collection/collection.types";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface DeleteCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionPath: ICollection["path"];
    category: ICategory;
}

export default function DeleteCategoryModal({
    isOpen,
    onClose,
    collectionPath,
    category,
}: DeleteCategoryModalProps) {
    if (!isOpen) return null;

    const deleteCategoryMutation = useDeleteCategory();

    const handleDelete = async () => {
        try {
            await deleteImage(category.banner);
            await deleteCategoryMutation.mutateAsync({
                collectionPath,
                categoryPath: category.path,
            });
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
                className="bg-white p-[30px] h-auto max-h-[80vh] shadow-lg w-[30vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold mb-4">
                    Підтвердження видалення
                </h2>
                <p className="mb-6">
                    Ви дійсно хочете видалити категорію {category?.name}?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                    >
                        Скасувати
                    </button>
                    <button
                        onClick={() => {
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
