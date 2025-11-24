"use client";

import { PRIORITIES } from "@/shared/constants/constants";
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
        control,
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

    return createPortal(
        <ModalWrapper onClose={handleClose} modalTitle="Adding a task">
            <form
                className="flex flex-col gap-3"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-2 gap-4">
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
                            label="Priority*"
                            control={control}
                            name="priority"
                            itemsList={PRIORITIES}
                            basicOptionLabel="Choose a priority"
                            getOptionValue={(p) => p}
                            getOptionLabel={(p) => p}
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
                        disabled={addTodoItemMutation.isPending}
                    >
                        Cancel
                    </MonoButtonUnderlined>

                    <MonoButton
                        type="submit"
                        disabled={addTodoItemMutation.isPending}
                    >
                        {addTodoItemMutation.isPending ? "Loading..." : "Add"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>,
        document.body
    );
}
