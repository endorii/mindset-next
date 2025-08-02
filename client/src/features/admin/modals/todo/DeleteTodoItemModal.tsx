"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton, DeleteButton } from "@/shared/ui/buttons";
import { ModalWrapper, FormButtonsWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { ITodoItem } from "../../admin.types";
import { useDeleteTodoItem } from "../../hooks/useTodo";

interface DeleteTodoItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    todoItem: ITodoItem;
}

export default function DeleteTodoItemModal({
    isOpen,
    onClose,
    todoItem,
}: DeleteTodoItemModalProps) {
    if (!isOpen || !todoItem) return null;

    const deleteTodoItemMutation = useDeleteTodoItem();

    const handleDelete = async () => {
        try {
            if (!todoItem.id) return;

            await deleteTodoItemMutation.mutateAsync(todoItem.id);
            toast.success("Завдання упішно видалено!");
        } catch (e) {
            toast.error("Помилка при видаленні завдання");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Видалення завдання"}>
            <div className="mb-6 text-white">
                Ви дійсно хочете видалити це завдання?
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
