"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import InputField from "@/shared/ui/inputs/InputField";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import { toast } from "sonner";
import { TodoPriority } from "../../admin.types";
import { useCreateTodoItem } from "../../hooks/useTodo";
import { priorities } from "@/shared/utils/helpers";

interface AddTodoItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface TodoFormData {
    title: string;
    priority: TodoPriority;
}

export default function AddTodoItemModal({
    isOpen,
    onClose,
}: AddTodoItemModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<TodoFormData>({
        defaultValues: {
            title: "",
            priority: TodoPriority.low,
        },
    });

    const [modalMessage, setModalMessage] = useState("");

    const addTodoItemMutation = useCreateTodoItem();

    const handleClose = () => {
        reset();
        setModalMessage("");
        onClose();
    };

    const onSubmit = async (data: TodoFormData) => {
        try {
            await addTodoItemMutation.mutateAsync({
                title: data.title,
                priority: data.priority,
            });

            handleClose();
            toast.success("Завдання упішно створено!");
        } catch (error: any) {
            setModalMessage(error?.message || "Помилка при створенні завдання");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Додавання категорії"}>
            <form
                className="flex flex-col gap-[20px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InputField
                            label="Назва завдання"
                            type="text"
                            placeholder="Назва категорії"
                            {...register("title", {
                                required: "Введіть назву",
                                minLength: {
                                    value: 2,
                                    message: "Мінімум 2 символи",
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
                    <MonoButton
                        type="button"
                        onClick={handleClose}
                        disabled={
                            addTodoItemMutation.isPending ||
                            addTodoItemMutation.isPending
                        }
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={
                            addTodoItemMutation.isPending ||
                            addTodoItemMutation.isPending
                        }
                    >
                        {addTodoItemMutation.isPending ||
                        addTodoItemMutation.isPending
                            ? "Завантаження..."
                            : "Додати"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
