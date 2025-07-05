"use client";

import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import { deleteImage, deleteImages } from "@/shared/api/images.api";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { createPortal } from "react-dom";
import { useDeleteProduct } from "../hooks/useProducts";
import { IProduct } from "../types/products.types";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import DeleteButton from "@/shared/ui/buttons/DeleteButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";

interface DeleteProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionPath: ICollection["path"];
    categoryPath: ICategory["path"];
    product: IProduct;
}

export default function DeleteProductModal({
    isOpen,
    onClose,
    collectionPath,
    categoryPath,
    product,
}: DeleteProductModalProps) {
    const deleteProduct = useDeleteProduct();

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const handleDelete = async () => {
        try {
            await deleteImage(product.banner);
            await deleteImages(product.images);
            await deleteProduct.mutateAsync({
                collectionPath,
                categoryPath,
                productPath: product.path,
            });
            onClose();
        } catch (error) {
            console.error("Помилка при видаленні:", error);
        }
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
            <div className="flex justify-end gap-4">
                <MonoButton type="button" onClick={onClose}>
                    Скасувати
                </MonoButton>
                <DeleteButton onClick={handleDelete}>Видалити</DeleteButton>
            </div>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
