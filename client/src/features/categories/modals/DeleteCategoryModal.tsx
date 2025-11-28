"use client";

// import { deleteImage } from "@/shared/api/files.api";
import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { FormButtonsWrapper, ModalWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useDeleteCategory } from "../hooks/useCategories";
import { ICategory } from "../types/categories.types";

interface DeleteCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: ICategory;
}

export function DeleteCategoryModal({
    isOpen,
    onClose,
    category,
}: DeleteCategoryModalProps) {
    if (!isOpen) return null;

    const deleteCategoryMutation = useDeleteCategory();

    const handleDelete = async () => {
        if (!category.id) return;
        if (category.products && category.products.length > 0) {
            toast.info(
                "Category contains products, to Delete it, delete the products that are in it"
            );
            return;
        }

        await deleteCategoryMutation.mutateAsync({
            collectionId: category.collectionId,
            categoryId: category.id,
        });
        onClose();
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Deletting category"}>
            <div className="font-light">
                Do you really want to Delete the category{" "}
                <span className="font-semibold underline">{category.name}</span>
                ?
            </div>
            <FormButtonsWrapper>
                <MonoButtonUnderlined
                    onClick={onClose}
                    disabled={deleteCategoryMutation.isPending}
                >
                    Cancel
                </MonoButtonUnderlined>
                <DeleteButton
                    onClick={handleDelete}
                    disabled={deleteCategoryMutation.isPending}
                >
                    {deleteCategoryMutation.isPending
                        ? "Deletting..."
                        : "Delete"}
                </DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
