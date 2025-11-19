"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { InputField } from "@/shared/ui/inputs/InputField";
import { BasicSelector } from "@/shared/ui/selectors/BasicSelector";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { priorities } from "@/shared/utils/helpers";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useUpdateTodoItem } from "../../hooks/useTodo";
import { ITodoItem, TodoPriority } from "../../types/admin.types";

interface EditTodoItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    todoItem: ITodoItem;
}

interface TodoItemFormData {
    title: string;
    priority: TodoPriority;
}

export function EditTodoItemModal({
    isOpen,
    onClose,
    todoItem,
}: EditTodoItemModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TodoItemFormData>({
        defaultValues: {
            title: "",
            priority: TodoPriority.low,
        },
    });

    const [modalMessage, setModalMessage] = useState("");
    const editTodoItemMutation = useUpdateTodoItem();

    useEffect(() => {
        if (todoItem) {
            reset({
                title: todoItem.title,
                priority: todoItem.priority,
            });
            setModalMessage("");
        }
    }, [todoItem, reset]);

    if (!isOpen || !todoItem) return null;

    const onSubmit = async (data: TodoItemFormData) => {
        try {
            if (!todoItem.id) return;

            await editTodoItemMutation.mutateAsync({
                todoId: todoItem.id,
                data: {
                    title: data.title,
                    priority: data.priority,
                },
            });
            onClose();
        } catch (error: any) {
            setModalMessage(error?.message || "Error while editing task");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Editing a task"}>
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-2 gap-[15px]">
                        <InputField
                            label="Task name*"
                            type="text"
                            placeholder="Task name"
                            {...register("title", {
                                required: "Enter task name",
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters",
                                },
                            })}
                            errorMessage={errors.title?.message}
                        />

                        <BasicSelector<string>
                            label={"Priority*"}
                            register={{
                                ...register("priority", {
                                    required: "Choose a priority",
                                }),
                            }}
                            itemsList={priorities}
                            basicOptionLabel="Choose a priority"
                            getOptionLabel={(priority) => priority}
                            getOptionValue={(priority) => priority}
                            errorMessage={errors.priority?.message}
                        />
                    </div>
                </FormFillingWrapper>

                {modalMessage && (
                    <p className="text-red-500 text-sm">{modalMessage}</p>
                )}

                <FormButtonsWrapper>
                    <MonoButton onClick={onClose} type="button">
                        Cancel
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={
                            editTodoItemMutation.isPending ||
                            editTodoItemMutation.isPending
                        }
                    >
                        {editTodoItemMutation.isPending ||
                        editTodoItemMutation.isPending
                            ? "Loading..."
                            : "Confirm"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
