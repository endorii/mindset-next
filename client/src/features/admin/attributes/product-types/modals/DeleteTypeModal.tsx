"use client";

import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useDeleteType } from "../hooks/useTypes";
import { IType } from "../types/product-type.types";
import { createPortal } from "react-dom";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import DeleteButton from "@/shared/ui/buttons/DeleteButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import { toast } from "sonner";

interface DeleteTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: IType;
}

export default function DeleteTypeModal({
    isOpen,
    onClose,
    type,
}: DeleteTypeModalProps) {
    if (!isOpen) return null;

    const deleteTypeMutation = useDeleteType();

    const handleDelete = async () => {
        try {
            await deleteTypeMutation.mutateAsync(type.id);
            toast.success("Тип упішно видалено!");
        } catch (e) {
            toast.error("Помилка при видаленні типу");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Видалення типу"}>
            <div className="mb-6">
                Ви дійсно хочете видалити тип {type?.name}?
            </div>
            <FormButtonsWrapper>
                <MonoButton onClick={onClose}>Скасувати</MonoButton>
                <DeleteButton
                    onClick={async () => {
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
