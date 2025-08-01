import React from "react";
import { formatDate } from "../utils/formatDate";
import { IRecentActions } from "@/features/admin/recent-actions/types/recent-actions.types";

function AdminRecentActions({ actions }: { actions: IRecentActions[] }) {
    return (
        <div className="flex flex-col gap-[20px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] w-2/3">
            <div className="flex gap-[15px] items-center">
                <h2 className="text-lg font-semibold">Останні дії</h2>
                <div className="text-gray-600 text-sm mt-[3px]">
                    (Останні дії очищуються автоматично, якщо період вище 30-ти
                    днів)
                </div>
            </div>

            {actions.length > 0 ? (
                <div className="flex flex-col gap-[7px] max-h-[470px] overflow-y-auto">
                    {actions.map((action) => (
                        <div
                            key={action.id}
                            className={`border-l-4 ${
                                action.action.startsWith("Додано")
                                    ? "border-green-500"
                                    : action.action.startsWith("Редаговано")
                                    ? "border-yellow-300"
                                    : action.action.startsWith("Видалено")
                                    ? "border-red-500"
                                    : "border-blue-500"
                            } pl-4 py-2 text-gray-100`}
                        >
                            <div className="opacity-70 text-sm">
                                {formatDate(action.createdAt)}
                            </div>
                            <div>{action.action}</div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm">Немає дій за цими фільтрами</p>
            )}
        </div>
    );
}

export default AdminRecentActions;
