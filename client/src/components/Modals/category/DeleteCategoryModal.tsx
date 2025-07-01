"use client";

import { deleteImage } from "@/lib/api/images.api";
import { useDeleteCategory } from "@/lib/hooks/useCategories";
import { useEscapeKeyClose } from "@/lib/hooks/useEscapeKeyClose";
import { ICategory } from "@/types/category/category.types";
import { ICollection } from "@/types/collection/collection.types";
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
            if (category.banner) {
                await deleteImage(category.banner);
            }
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
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-black rounded-xl text-white bg-gradient-to-br from-black/0 to-white/5 border border-white/10 p-[30px] max-h-[80vh] shadow-lg w-[30vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-3xl font-thin mb-6">
                    Підтвердження видалення
                </h2>
                <p className="mb-6 text-white">
                    Ви дійсно хочете видалити категорію{" "}
                    <strong>{category?.name || "Без назви"}</strong>?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black"
                    >
                        Скасувати
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            handleDelete();
                        }}
                        className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer border border-red-950 bg-red-900 rounded-xl hover:bg-red-700 group transition-all duration-300 hover:text-white"
                    >
                        Видалити
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
