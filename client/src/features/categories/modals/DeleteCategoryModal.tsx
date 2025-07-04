"use client";

import { ICollection } from "@/features/collections/types/collections.types";
import { deleteImage } from "@/shared/api/images.api";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { createPortal } from "react-dom";
import { useDeleteCategory } from "../hooks/useCategories";
import { ICategory } from "../types/categories.types";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import DeleteButton from "@/shared/ui/buttons/DeleteButton";

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
                    <MonoButton onClick={onClose}>Скасувати</MonoButton>
                    <DeleteButton
                        onClick={() => {
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
