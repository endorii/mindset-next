"use client";

import { deleteImage } from "@/lib/api/images.api";
import { useDeleteCollection } from "@/lib/hooks/useCollections";
import { useEscapeKeyClose } from "@/lib/hooks/useEscapeKeyClose";
import { ICollection } from "@/types/collection/collection.types";
import { createPortal } from "react-dom";

interface DeleteCollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    collection: ICollection;
}

export default function DeleteCollectionModal({
    isOpen,
    onClose,
    collection,
}: DeleteCollectionModalProps) {
    if (!isOpen) return null;

    const deleteCollection = useDeleteCollection();

    const handleDelete = async () => {
        try {
            await deleteImage(collection.banner);
            await deleteCollection.mutateAsync(collection.path);
        } catch (error) {
            console.error("Помилка при видаленні:", error);
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div className="bg-black">
                <div
                    className="rounded-xl text-white bg-gradient-to-br from-black/0 to-white/3 border border-white/10 p-[30px] h-auto max-h-[80vh] shadow-lg w-[36vw] overflow-y-auto cursor-default"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-3xl font-thin mb-4">
                        Підтвердження видалення
                    </h2>
                    <hr className="border-t border-white/10 py-[10px]" />
                    <p className="mb-6 text-white/80 text-[16px] leading-[1.6]">
                        Ви дійсно хочете видалити колекцію{" "}
                        <span className="font-semibold text-white">
                            {collection.name}
                        </span>
                        ?
                    </p>
                    <div className="flex justify-end gap-4 mt-[20px]">
                        <button
                            onClick={onClose}
                            className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black"
                        >
                            Скасувати
                        </button>
                        <button
                            onClick={() => {
                                onClose();
                                handleDelete();
                            }}
                            className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer border border-red-950 bg-red-900 rounded-xl hover:bg-red-700 group transition-all duration-300 hover:text-white"
                        >
                            Видалити
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
