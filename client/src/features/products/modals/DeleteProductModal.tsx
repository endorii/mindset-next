"use client";

import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import { deleteImage, deleteImages } from "@/shared/api/images.api";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { createPortal } from "react-dom";
import { useDeleteProduct } from "../hooks/useProducts";
import { IProduct } from "../types/products.types";

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
        <div
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-black rounded-xl text-white bg-gradient-to-br from-black/0 to-white/5 border border-white/10 p-[30px] max-h-[80vh] shadow-lg w-[30vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-2xl font-thin mb-6">
                    Підтвердження видалення
                </h2>
                <p className="mb-8 text-lg">
                    Ви дійсно хочете видалити товар{" "}
                    <span className="font-semibold">{product?.name}</span>?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all duration-300"
                    >
                        Скасувати
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer border border-white/10 rounded-xl bg-red-600 hover:bg-red-700 text-white transition-all duration-300"
                    >
                        Видалити
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
