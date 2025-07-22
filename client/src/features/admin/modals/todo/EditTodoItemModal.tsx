"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { priorities } from "@/shared/utils/helpers";
import InputField from "@/shared/ui/inputs/InputField";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InputField
                            label="Назва"
                            type="text"
                            placeholder="Назва категорії"
                            {...register("title", {
                                required: "Введіть назву завдання",
                                minLength: {
                                    value: 3,
                                    message: "Мінімум 3 символи",
                                },
                            })}
                            errorMessage={errors.title?.message}
                        />

                        <div className="flex flex-col gap-[7px]">
                            <label
                                htmlFor="status"
                                className="font-semibold text-sm"
                            >
                                Пріорітет
                            </label>
                            <select
                                {...register("priority", {
                                    required: "Оберіть пріорітет",
                                })}
                                className="border border-white/10 rounded p-[10px] outline-0 cursor-pointer"
                            >
                                <option value="" disabled>
                                    Оберіть статус
                                </option>
                                {priorities.map((priority) => (
                                    <option key={priority} value={priority}>
                                        {priority}
                                    </option>
                                ))}
                            </select>
                        </div>
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
