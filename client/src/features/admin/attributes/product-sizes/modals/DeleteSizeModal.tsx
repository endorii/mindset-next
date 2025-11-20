"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { FormButtonsWrapper, ModalWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { useDeleteSize } from "../hooks/useSizes";
import { ISize } from "../types/product-size.types";

interface DeleteSizeModalProps {
    isOpen: boolean;
    onClose: () => void;
    size: ISize;
}

export function DeleteSizeModal({
    isOpen,
    onClose,
    size,
}: DeleteSizeModalProps) {
    if (!isOpen) return null;

    const deleteSizeMutation = useDeleteSize();

    const handleDelete = async () => {
        await deleteSizeMutation.mutateAsync(size.id);
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Deletting size"}>
            <div className="font-light">
                Do you really want to delete the size{" "}
                <span className="font-semibold underline">{size.name}</span>?
            </div>
            <FormButtonsWrapper>
                <MonoButtonUnderlined onClick={onClose}>
                    Cancel
                </MonoButtonUnderlined>
                <DeleteButton
                    onClick={async () => {
                        onClose();
                        handleDelete();
                    }}
                >
                    Delete
                </DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
