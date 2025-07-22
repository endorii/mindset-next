"use client";

import { PlusIcon, EditIcon, TrashIcon } from "@/shared/icons";
import ButtonWithIcon from "@/shared/ui/buttons/ButtonWithIcon";
import DeleteButtonWithIcon from "@/shared/ui/buttons/DeleteButtonWithIcon";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import { formatDate } from "@/shared/utils/formatDate";
import React from "react";
import { useTodoList } from "../hooks/useTodo";

function HomeTodo() {
    const { data: todos } = useTodoList();

    return (
        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[15px] w-2/5">
            <div className="flex gap-[15px] justify-between">
                <div className="text-xl font-semibold">ToDo</div>
                <MonoButton onClick={() => {}}>
                    <div>Додати завдання</div>
                    <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                </MonoButton>
            </div>
            {todos && todos.length > 0 ? (
                <div className="space-y-4 max-h-[470px] overflow-y-auto">
                    {todos.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between p-4 rounded-xl border border-white/10 shadow-md bg-white/3"
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
                            <div className="flex gap-3 mt-1">
                                <ButtonWithIcon onClick={() => {}}>
                                    <EditIcon className="w-[24px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                </ButtonWithIcon>
                                <DeleteButtonWithIcon onClick={() => {}}>
                                    <TrashIcon className="w-[28px] stroke-white stroke-[1.7] fill-none" />
                                </DeleteButtonWithIcon>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-white/70">Завдання відсутні</div>
            )}
        </div>
    );
}

export default HomeTodo;
