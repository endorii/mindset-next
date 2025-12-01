"use client";

import { EditIcon, PlusIcon, TrashIcon } from "@/shared/icons";
import { TodoModalType } from "@/shared/types/types";
import {
    ButtonWithIcon,
    DeleteButtonWithIcon,
    MonoButton,
} from "@/shared/ui/buttons";
import { formatDate } from "@/shared/utils";
import { useState } from "react";
import {
    AddTodoItemModal,
    DeleteTodoItemModal,
    EditTodoItemModal,
} from "../modals/todo";
import { ITodoItem } from "../types/admin.types";

export function HomeTodo({ todos }: { todos: ITodoItem[] | undefined }) {
    const [activeModal, setActiveModal] = useState<TodoModalType>(null);
    const [selectedTodoItem, setSelectedTodoItem] = useState<ITodoItem | null>(
        null
    );

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
        <div className="  bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[10px] w-1/2 lg:w-full">
            <div className="flex gap-[15px] justify-between items-center">
                <div className="text-3xl font-perandory tracking-wider">
                    Tasks
                </div>
                <MonoButton onClick={() => openModal("add")}>
                    <div>Add task</div>
                    <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                </MonoButton>
            </div>
            {todos && todos.length > 0 ? (
                <div className="flex flex-col gap-[10px] max-h-[470px] overflow-y-auto">
                    {todos.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between p-[20px] gap-[10px] border border-white/5 shadow-md bg-white/3"
                        >
                            <div className="flex flex-col">
                                <span className="text-base font-medium text-white">
                                    {task.title}
                                </span>
                                <span className="text-sm mt-[7px] text-neutral-300">
                                    Priority:{" "}
                                    <span
                                        className={`text-base font-perandory tracking-wider ${
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
                                <span className="text-xs text-neutral-300 mt-1">
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
                <div className=" p-[20px]  flex items-center justify-center text-center text-neutral-200">
                    No tasks available.
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
