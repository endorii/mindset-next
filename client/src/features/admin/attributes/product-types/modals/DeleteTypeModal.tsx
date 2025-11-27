"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { FormButtonsWrapper, ModalWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { useDeleteType } from "../hooks/useTypes";
import { IType } from "../types/product-type.types";

interface DeleteTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: IType;
}

export function DeleteTypeModal({
    isOpen,
    onClose,
    type,
}: DeleteTypeModalProps) {
    if (!isOpen) return null;

    const deleteTypeMutation = useDeleteType();

    const handleDelete = async () => {
        await deleteTypeMutation.mutateAsync(type.id);
        onClose();
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Deletting type"}>
            <div className="font-light">
                Do you really want to delete the type{" "}
                <span className="font-semibold underline">{type.name}</span>?
            </div>
            <FormButtonsWrapper>
                <MonoButtonUnderlined
                    onClick={onClose}
                    disabled={deleteTypeMutation.isPending}
                >
                    Cancel
                </MonoButtonUnderlined>
                <DeleteButton
                    onClick={handleDelete}
                    disabled={deleteTypeMutation.isPending}
                >
                    {deleteTypeMutation.isPending ? "Deletting..." : "Delete"}
                </DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
