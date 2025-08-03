"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import InputField from "@/shared/ui/inputs/InputField";
import BasicSelector from "@/shared/ui/selectors/BasicSelector";
import {
    ModalWrapper,
    FormFillingWrapper,
    FormButtonsWrapper,
} from "@/shared/ui/wrappers";
import { priorities } from "@/shared/utils/helpers";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ITodoItem, TodoPriority } from "../../admin.types";
import { useUpdateTodoItem } from "../../hooks/useTodo";

interface EditTodoItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    todoItem: ITodoItem;
}

interface TodoItemFormData {
    title: string;
    priority: TodoPriority;
}

export default function EditTodoItemModal({
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
                id: todoItem.id,
                data: {
                    title: data.title,
                    priority: data.priority,
                },
            });

            onClose();
            toast.success("Завдання упішно відредаговано!");
        } catch (error: any) {
            setModalMessage(
                error?.message || "Помилка при редагуванні завдання"
            );
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Редагування завдання"}>
            <form
                className="flex flex-col gap-[20px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-2 gap-[20px]">
                        <InputField
                            label="Назва завдання*"
                            type="text"
                            placeholder="Назва завдання"
                            {...register("title", {
                                required: "Введіть назву завдання",
                                minLength: {
                                    value: 3,
                                    message: "Мінімум 3 символи",
                                },
                            })}
                            errorMessage={errors.title?.message}
                        />

                        <BasicSelector<string>
                            label={"Пріорітет*"}
                            register={{
                                ...register("priority", {
                                    required: "Оберіть пріорітет",
                                }),
                            }}
                            itemsList={priorities}
                            basicOptionLabel="Оберіть пріорітет"
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
                        Скасувати
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
                            ? "Завантаження..."
                            : "Підтвердити"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
