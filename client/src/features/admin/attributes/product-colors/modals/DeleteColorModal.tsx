"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton, DeleteButton } from "@/shared/ui/buttons";
import { ModalWrapper, FormButtonsWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { useDeleteColor } from "../hooks/useColors";
import { IColor } from "../types/product-color.types";

interface DeleteColorModalProps {
    isOpen: boolean;
    onClose: () => void;
    color: IColor;
}

export default function DeleteColorModal({
    isOpen,
    onClose,
    color,
}: DeleteColorModalProps) {
    if (!isOpen) return null;

    const deleteColorMutation = useDeleteColor();

    const handleDelete = async () => {
        try {
            await deleteColorMutation.mutateAsync(color.id);
            toast.success("Колір упішно видалено!");
        } catch (e) {
            toast.error("Помилка при видаленні кольору");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Видалення кольору"}>
            <div className="mb-8 text-lg">
                Ви дійсно хочете видалити колір{" "}
                <span className="font-semibold">{color.name}</span>?
            </div>
            <FormButtonsWrapper>
                <MonoButton
                    onClick={onClose}
                    disabled={deleteColorMutation.isPending}
                >
                    Скасувати
                </MonoButton>
                <DeleteButton
                    onClick={() => {
                        handleDelete();
                        onClose();
                    }}
                    disabled={deleteColorMutation.isPending}
                >
                    {deleteColorMutation.isPending
                        ? "Видалення..."
                        : "Видалити"}
                </DeleteButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
