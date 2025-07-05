"use client";

import { ICollection } from "@/features/collections/types/collections.types";
import { deleteImage } from "@/shared/api/images.api";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { createPortal } from "react-dom";
import { useDeleteCategory } from "../hooks/useCategories";
import { ICategory } from "../types/categories.types";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import DeleteButton from "@/shared/ui/buttons/DeleteButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";

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
        <ModalWrapper onClose={onClose} modalTitle={"Видалення категорії"}>
            <div className="mb-6 text-white">
                Ви дійсно хочете видалити категорію{" "}
                <strong>{category?.name || "Без назви"}</strong>?
            </div>
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
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
