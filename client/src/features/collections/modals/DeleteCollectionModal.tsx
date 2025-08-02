"use client";

import { deleteImage } from "@/shared/api/images.api";
import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton, DeleteButton } from "@/shared/ui/buttons";
import { ModalWrapper, FormButtonsWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useDeleteCollection } from "../hooks/useCollections";
import { ICollection } from "../types/collections.types";

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
            if (collection.categories && collection.categories.length > 0) {
                toast.error(
                    "Колекція містить категорії, щоб її видалити, видаліть категорії, які у ній знаходяться"
                );
                return;
            }

            await deleteImage(collection.banner);
            await deleteCollection.mutateAsync(collection.path);
            toast.success("Коллекцію упішно видалено!");
        } catch (e) {
            toast.error("Помилка при видаленні колекції");
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
            <FormButtonsWrapper>
                <MonoButton onClick={onClose}>Скасувати</MonoButton>
                <DeleteButton
                    onClick={() => {
                        onClose();
                        handleDelete();
                    }}
                >
                    Видалити
                </DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
