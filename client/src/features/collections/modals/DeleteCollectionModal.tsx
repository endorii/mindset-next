"use client";

import { deleteImage } from "@/shared/api/images.api";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { createPortal } from "react-dom";
import { useDeleteCollection } from "../hooks/useCollections";
import { ICollection } from "../types/collections.types";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import DeleteButton from "@/shared/ui/buttons/DeleteButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";

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
        <ModalWrapper onClose={onClose} modalTitle={"Видалення колекції"}>
            <div className="mb-6 text-white/80 text-[16px] leading-[1.6]">
                Ви дійсно хочете видалити колекцію{" "}
                <span className="font-semibold text-white">
                    {collection.name}
                </span>
                ?
            </div>
            <div className="flex justify-end gap-4 mt-[20px]">
                <MonoButton onClick={onClose}>Скасувати</MonoButton>
                <DeleteButton
                    onClick={() => {
                        onClose();
                        handleDelete();
                    }}
                >
                    Видалити
                </DeleteButton>
            </div>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
