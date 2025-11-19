"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton, MonoButton } from "@/shared/ui/buttons";
import { FormButtonsWrapper, ModalWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { useDeleteColor } from "../hooks/useColors";
import { IColor } from "../types/product-color.types";

interface DeleteColorModalProps {
    isOpen: boolean;
    onClose: () => void;
    color: IColor;
}

export function DeleteColorModal({
    isOpen,
    onClose,
    color,
}: DeleteColorModalProps) {
    if (!isOpen) return null;

    const deleteColorMutation = useDeleteColor();

    const handleDelete = async () => {
        await deleteColorMutation.mutateAsync(color.id);
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Color removal"}>
            <div className="mb-8 text-lg">
                Do you really want to remove the color?{" "}
                <span className="font-semibold">{color.name}</span>?
            </div>
            <FormButtonsWrapper>
                <MonoButton
                    onClick={onClose}
                    disabled={deleteColorMutation.isPending}
                >
                    Cancel
                </MonoButton>
                <DeleteButton
                    onClick={() => {
                        handleDelete();
                        onClose();
                    }}
                    disabled={deleteColorMutation.isPending}
                >
                    {deleteColorMutation.isPending ? "Deletting..." : "Delete"}
                </DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
