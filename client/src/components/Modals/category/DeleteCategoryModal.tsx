"use client";

import { deleteCategory } from "@/lib/api/categories.api";
import { useDeleteCategory } from "@/lib/hooks/useCategories";
import { ICategory, ICollection } from "@/types/types";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionPath: ICollection["path"];
    item: ICategory;
}

export default function DeleteCategoryModal({
    isOpen,
    onClose,
    collectionPath,
    item,
}: ModalProps) {
    if (!isOpen) return null;

    const deleteCategory = useDeleteCategory();

    const handleDelete = async () => {
        try {
            await deleteCategory.mutateAsync({
                collectionPath,
                categoryPath: item.path,
            });
        } catch (error) {
            console.error("Помилка при видаленні:", error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
            <div className="bg-white p-[40px] shadow-lg max-w-sm w-full">
                <h2 className="text-lg font-bold mb-4">
                    Підтвердження видалення
                </h2>
                <p className="mb-6">Ви дійсно хочете видалити {item?.name}?</p>
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
                            handleDelete();
                            console.log("Колекцію було видалено");
                        }}
                        className="px-[20px] py-[7px] bg-black/70 border hover:bg-black hover:border-transparent text-white cursor-pointer transition-all duration-200"
                    >
                        Видалити
                    </button>
                </div>
            </div>
        </div>
    );
}
