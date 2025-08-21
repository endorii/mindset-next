"use client";

import { PlusIcon, EditIcon, TrashIcon } from "@/shared/icons";
import { TodoModalType } from "@/shared/types/types";
import {
    MonoButton,
    ButtonWithIcon,
    DeleteButtonWithIcon,
} from "@/shared/ui/buttons";
import { useState } from "react";
import { ITodoItem } from "../types/admin.types";
import { useTodoList } from "../hooks/useTodo";
import {
    AddTodoItemModal,
    EditTodoItemModal,
    DeleteTodoItemModal,
} from "../modals/todo";
import { formatDate } from "@/shared/utils/formatDate";

function HomeTodo({
    todos,
    isTodosError,
}: {
    todos: ITodoItem[] | undefined;
    isTodosError: boolean;
}) {
    const [activeModal, setActiveModal] = useState<TodoModalType>(null);
    const [selectedTodoItem, setSelectedTodoItem] = useState<ITodoItem | null>(
        null
    );
    if (isTodosError) {
        return (
            <div className="rounded-xl bg-red-500/10 shadow-lg backdrop-blur-[100px] border border-red-500/30 p-[20px] w-1/2 lg:w-full min-h-[470px] flex items-center justify-center text-center text-red-400">
                Виникла помилка під час завантаження завдань
            </div>
        );
    }

    const openModal = (
        type: TodoModalType,
        todoItem: ITodoItem | null = null
    ) => {
        setSelectedTodoItem(todoItem);
        setActiveModal(type);
    };

    const closeModal = () => {
        setSelectedTodoItem(null);
        setActiveModal(null);
    };

    return (
        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[15px] w-1/2 lg:w-full">
            <div className="flex gap-[15px] justify-between">
                <div className="text-xl font-semibold">ToDo</div>
                <MonoButton onClick={() => openModal("add")}>
                    <div>Додати завдання</div>
                    <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                </MonoButton>
            </div>
            {todos && todos.length > 0 ? (
                <div className="flex flex-col gap-[10px] max-h-[470px] overflow-y-auto">
                    {todos.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between p-[20px] gap-[10px] rounded-xl border border-white/10 shadow-md bg-white/3"
                        >
                            <div className="flex flex-col">
                                <span className="text-base font-medium text-white">
                                    {task.title}
                                </span>
                                <span className="text-xs mt-[7px] text-white/50">
                                    Пріоритет:{" "}
                                    <span
                                        className={`${
                                            task.priority === "high"
                                                ? "text-red-500"
                                                : task.priority === "medium"
                                                ? "text-yellow-500"
                                                : "text-green-500"
                                        }`}
                                    >
                                        {task.priority}
                                    </span>
                                </span>
                                <span className="text-xs text-white/50 mt-1">
                                    {formatDate(task.createdAt || "")} /{" "}
                                    {formatDate(task.updatedAt || "")}
                                </span>
                            </div>
                            <div className="flex xs:flex-col gap-[10px]">
                                <ButtonWithIcon
                                    onClick={() => openModal("edit", task)}
                                >
                                    <EditIcon className="w-[24px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                </ButtonWithIcon>
                                <DeleteButtonWithIcon
                                    onClick={() => openModal("delete", task)}
                                >
                                    <TrashIcon className="w-[28px] stroke-white stroke-[1.7] fill-none" />
                                </DeleteButtonWithIcon>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className=" p-[20px]  flex items-center justify-center text-center text-white/60">
                    Завдання відсутні
                </div>
            )}

            <AddTodoItemModal
                isOpen={activeModal === "add"}
                onClose={closeModal}
            />
            {selectedTodoItem && (
                <>
                    <EditTodoItemModal
                        isOpen={activeModal === "edit"}
                        onClose={closeModal}
                        todoItem={selectedTodoItem}
                    />
                    <DeleteTodoItemModal
                        isOpen={activeModal === "delete"}
                        onClose={closeModal}
                        todoItem={selectedTodoItem}
                    />
                </>
            )}
        </div>
    );
}

export default HomeTodo;
