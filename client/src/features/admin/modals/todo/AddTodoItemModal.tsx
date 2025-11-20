"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
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
            setModalMessage(error?.message || "Error creating task");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Adding a task"}>
            <form
                className="flex flex-col gap-[10px]"
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
                                    value: 2,
                                    message: "Minimum 2 characters",
                                },
                            })}
                            errorMessage={errors.title?.message}
                        />

                        <BasicSelector
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
                    <MonoButtonUnderlined
                        type="button"
                        onClick={handleClose}
                        disabled={
                            addTodoItemMutation.isPending ||
                            addTodoItemMutation.isPending
                        }
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={
                            addTodoItemMutation.isPending ||
                            addTodoItemMutation.isPending
                        }
                    >
                        {addTodoItemMutation.isPending ||
                        addTodoItemMutation.isPending
                            ? "Loading..."
                            : "Add"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
