"use client";

import { deleteImage, deleteImages } from "@/shared/api/images.api";
import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton, DeleteButton } from "@/shared/ui/buttons";
import { ModalWrapper, FormButtonsWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { useDeleteProduct } from "../hooks/useProducts";
import { IProduct } from "../types/products.types";

interface DeleteProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: IProduct;
}

export default function DeleteProductModal({
    isOpen,
    onClose,
    product,
}: DeleteProductModalProps) {
    const deleteProduct = useDeleteProduct();

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const handleDelete = async () => {
        await deleteImage(product.banner);
        if (product.images.length > 0) {
            await deleteImages(product.images);
        }
        await deleteProduct.mutateAsync(product.id);
        onClose();
    };

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Видалення товару"}>
            <div className="mb-6 text-white/80 text-[16px] leading-[1.6]">
                Ви дійсно хочете видалити товар{" "}
                <span className="font-semibold text-white">
                    {product?.name}
                </span>
                ?
            </div>
            <FormButtonsWrapper>
                <MonoButton type="button" onClick={onClose}>
                    Скасувати
                </MonoButton>
                <DeleteButton onClick={handleDelete}>Видалити</DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
