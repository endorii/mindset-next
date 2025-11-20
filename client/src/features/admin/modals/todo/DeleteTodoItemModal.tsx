"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { DeleteButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { FormButtonsWrapper, ModalWrapper } from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { useDeleteTodoItem } from "../../hooks/useTodo";
import { ITodoItem } from "../../types/admin.types";

interface DeleteTodoItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    todoItem: ITodoItem;
}

export function DeleteTodoItemModal({
    isOpen,
    onClose,
    todoItem,
}: DeleteTodoItemModalProps) {
    if (!isOpen) return null;

    const deleteTodoItemMutation = useDeleteTodoItem();

    const handleDelete = async () => {
        if (!todoItem.id) return;
        await deleteTodoItemMutation.mutateAsync(todoItem.id);
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Deleting tasks"}>
            <div className="font-light">
                Do you really want to Delete this task?
            </div>
            <FormButtonsWrapper>
                <MonoButtonUnderlined onClick={onClose}>
                    Cancel
                </MonoButtonUnderlined>
                <DeleteButton
                    onClick={() => {
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
