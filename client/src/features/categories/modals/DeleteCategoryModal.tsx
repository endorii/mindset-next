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
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import { toast } from "sonner";

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
            if (category.products && category.products.length > 0) {
                toast.info(
                    "Категорія містить товари, щоб її видалити, видаліть товари, які у ній знаходяться"
                );
                return;
            }

            if (category.banner) {
                await deleteImage(category.banner);
            }

            await deleteCategoryMutation.mutateAsync({
                collectionPath,
                categoryPath: category.path,
            });

            toast.success("Категорію успішно видалено!");
        } catch (e) {
            toast.error("Помилка при видаленні категорії");
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
