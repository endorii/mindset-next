"use client";

import { deleteImage, deleteImages } from "@/lib/api/images.api";
import { useDeleteProduct } from "@/lib/hooks/useProducts";
import { ICategory, ICollection, IProduct } from "@/types/types";
import { createPortal } from "react-dom";

interface DeleteProductProps {
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
}: DeleteProductProps) {
    if (!isOpen) return null;

    const deleteProduct = useDeleteProduct();

    const handleDelete = async () => {
        try {
            await deleteProduct.mutateAsync({
                collectionPath,
                categoryPath,
                productPath: product.path,
            });
        } catch (error) {
            console.error("Помилка при видаленні:", error);
        }
    };
    const modalContent = (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
            <div className="bg-white p-[40px] shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4">
                    Підтвердження видалення
                </h2>
                <p className="mb-6">
                    Ви дійсно хочете видалити {product?.name}?
                </p>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={onClose}
                        className="px-[20px] py-[7px] bg-white text-black hover:bg-black hover:border-transparent hover:text-white cursor-pointer transition-all duration-200"
                    >
                        Скасувати
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            deleteImage(product.banner);
                            deleteImages(product.images);
                            handleDelete();
                        }}
                        className="px-[20px] py-[7px] bg-black/70 border hover:bg-black hover:border-transparent text-white cursor-pointer transition-all duration-200"
                    >
                        Видалити
                    </button>
                </div>
            </div>
        </div>
    );
    return createPortal(modalContent, document.body);
}
