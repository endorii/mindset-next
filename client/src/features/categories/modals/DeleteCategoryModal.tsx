"use client";

import { ICollection } from "@/features/collections/types/collections.types";
import { deleteImage } from "@/shared/api/images.api";
import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton, DeleteButton } from "@/shared/ui/buttons";
import { ModalWrapper, FormButtonsWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useDeleteCategory } from "../hooks/useCategories";
import { ICategory } from "../types/categories.types";

interface DeleteCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: ICategory;
}

export default function DeleteCategoryModal({
    isOpen,
    onClose,
    category,
}: DeleteCategoryModalProps) {
    if (!isOpen) return null;

    const deleteCategoryMutation = useDeleteCategory();

    const handleDelete = async () => {
        if (category.products && category.products.length > 0) {
            toast.info(
                "Категорія містить товари, щоб її видалити, видаліть товари, які у ній знаходяться"
            );
            return;
        }

        if (category.banner) {
            await deleteImage(category.banner);
        }

        if (category.id) {
            await deleteCategoryMutation.mutateAsync(category.id);
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Видалення категорії"}>
            <div className="mb-6 text-white">
                Ви дійсно хочете видалити категорію{" "}
                <strong>{category?.name || "Без назви"}</strong>?
            </div>
            <FormButtonsWrapper>
                <MonoButton onClick={onClose}>Скасувати</MonoButton>
                <DeleteButton
                    onClick={() => {
                        onClose();
                        handleDelete();
                    }}
                >
                    Видалити
                </DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
