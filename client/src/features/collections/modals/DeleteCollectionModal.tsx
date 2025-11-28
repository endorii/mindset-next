"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { FormButtonsWrapper, ModalWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useDeleteCollection } from "../hooks/useCollections";
import { ICollection } from "../types/collections.types";

interface DeleteCollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    collection: ICollection;
}

export function DeleteCollectionModal({
    isOpen,
    onClose,
    collection,
}: DeleteCollectionModalProps) {
    if (!isOpen) return null;

    const deleteCollectionMutation = useDeleteCollection();

    const handleDelete = async () => {
        if (!collection || !collection.id) return;
        if (collection.categories && collection.categories.length > 0) {
            toast.error(
                "Collection contains categories, to Delete it, delete the categories it contains"
            );
            return;
        }

        await deleteCollectionMutation.mutateAsync(collection.id);
        onClose();
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Deletting collections"}>
            <div className="text-neutral-200 text-[16px] leading-[1.6] font-light">
                Do you really want to Delete the collection{" "}
                <span className="font-semibold underline">
                    {collection.name}
                </span>
                ?
            </div>
            <FormButtonsWrapper>
                <MonoButtonUnderlined
                    onClick={onClose}
                    disabled={deleteCollectionMutation.isPending}
                >
                    Cancel
                </MonoButtonUnderlined>
                <DeleteButton
                    onClick={handleDelete}
                    disabled={deleteCollectionMutation.isPending}
                >
                    {deleteCollectionMutation.isPending
                        ? "Deletting..."
                        : "Delete"}
                </DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
