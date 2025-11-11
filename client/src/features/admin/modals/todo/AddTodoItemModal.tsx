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
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useCreateTodoItem } from "../../hooks/useTodo";
import { TodoPriority } from "../../types/admin.types";

interface AddTodoItemModalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface TodoFormData {
    title: string;
    priority: TodoPriority;
}

export function AddTodoItemModal({ isOpen, onClose }: AddTodoItemModalProps) {
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
        } catch (error: any) {
            setModalMessage(error?.message || "Помилка при створенні завдання");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Додавання завдання"}>
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-2 gap-[15px]">
                        <InputField
                            label="Назва завдання*"
                            type="text"
                            placeholder="Назва завдання"
                            {...register("title", {
                                required: "Введіть назву",
                                minLength: {
                                    value: 2,
                                    message: "Мінімум 2 символи",
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
