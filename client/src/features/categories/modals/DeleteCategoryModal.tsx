"use client";

// import { deleteImage } from "@/shared/api/files.api";
import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton, MonoButton } from "@/shared/ui/buttons";
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
        if (category.products && category.products.length > 0) {
            toast.info(
                "Category contains products, to Delete it, delete the products that are in it"
            );
            return;
        }

        if (category.banner) {
            // await deleteImage(category.banner);
        }

        if (category.id) {
            await deleteCategoryMutation.mutateAsync(category.id);
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Deletting category"}>
            <div className="mb-6 text-white">
                Do you really want to Delete the category?{" "}
                <strong>{category?.name || "No name"}</strong>?
            </div>
            <FormButtonsWrapper>
                <MonoButton onClick={onClose}>Cancel</MonoButton>
                <DeleteButton
                    onClick={() => {
                        onClose();
                        handleDelete();
                    }}
                >
                    Delete
                </DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
