"use client";

// import { deleteImage, deleteImages } from "@/shared/api/files.api";
import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { FormButtonsWrapper, ModalWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { useDeleteProduct } from "../hooks/useProducts";
import { IProduct } from "../types/products.types";

interface DeleteProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: IProduct;
}

export function DeleteProductModal({
    isOpen,
    onClose,
    product,
}: DeleteProductModalProps) {
    const deleteProduct = useDeleteProduct();

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const handleDelete = async () => {
        // await deleteImage(product.banner);
        if (product.images.length > 0) {
            // await deleteImages(product.images);
        }
        await deleteProduct.mutateAsync(product.id);
        onClose();
    };

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Deletting product"}>
            <div className="text-neutral-200 text-[16px] leading-[1.6] font-light">
                Do you really want to Delete the item?{" "}
                <span className="font-semibold text-white">
                    {product?.name}
                </span>
                ?
            </div>
            <FormButtonsWrapper>
                <MonoButtonUnderlined type="button" onClick={onClose}>
                    Cancel
                </MonoButtonUnderlined>
                <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
