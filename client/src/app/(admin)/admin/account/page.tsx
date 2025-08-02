"use client";

import { useRecentActions } from "@/features/admin/recent-actions/hooks/useRecentActions";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { AdminRecentActions } from "@/shared/components";
import { ChooseButton } from "@/shared/ui/buttons";
import { formatDate } from "@/shared/utils/formatDate";
import { useState, useMemo } from "react";

const actionTypeFilters = ["Всі", "Додано", "Редаговано", "Видалено"];
const entityFilters = [
    "Всі",
    "колекцію",
    "категорію",
    "товар",
    "колір",
    "тип",
    "розмір",
];
const sortFilters = ["Спочатку новіші", "Спочатку старіші"];

function capitalizeFirstLetter(str: string) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function AdminAccount() {
    const { data: user } = useCurrentUser();
    const { data: actions } = useRecentActions(user?.id);

    const [selectedType, setSelectedType] = useState("Всі");
    const [selectedEntity, setSelectedEntity] = useState("Всі");
    const [selectedSort, setSelectedSort] = useState("Спочатку новіші");

    const filteredActions = useMemo(() => {
        if (!actions) return [];

        let result = actions.filter((action) => {
            const isTypeMatch =
                selectedType === "Всі" ||
                action.action.startsWith(selectedType);
            const isEntityMatch =
                selectedEntity === "Всі" ||
                action.action.includes(selectedEntity);
            return isTypeMatch && isEntityMatch;
        });

        result.sort((a, b) => {
            const aDate = new Date(a.createdAt).getTime();
            const bDate = new Date(b.createdAt).getTime();
            return selectedSort === "Спочатку старіші"
                ? aDate - bDate
                : bDate - aDate;
        });

        return result;
    }, [actions, selectedType, selectedEntity, selectedSort]);

    return (
        <div className="flex flex-col gap-[15px]">
            <div className="text-2xl font-bold">Акаунт адміністратора</div>

            <div className="flex items-center gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[20px] py-[10px]">
                <div className="font-semibold">Фільтрувати за дією:</div>
                <ul className="flex gap-[10px]">
                    {actionTypeFilters.map((name) => (
                        <li key={name}>
                            <ChooseButton
                                isActive={selectedType === name}
                                onClick={() => setSelectedType(name)}
                            >
                                {capitalizeFirstLetter(name)}
                            </ChooseButton>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[20px] py-[10px]">
                <div className="font-semibold">Фільтрувати за об'єктом:</div>
                <ul className="flex gap-[10px] flex-wrap">
                    {entityFilters.map((name) => (
                        <li key={name}>
                            <ChooseButton
                                isActive={selectedEntity === name}
                                onClick={() => setSelectedEntity(name)}
                            >
                                {capitalizeFirstLetter(name)}
                            </ChooseButton>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[20px] py-[10px]">
                <div className="font-semibold">Сортування:</div>
                <ul className="flex gap-[10px]">
                    {sortFilters.map((name) => (
                        <li key={name}>
                            <ChooseButton
                                isActive={selectedSort === name}
                                onClick={() => setSelectedSort(name)}
                            >
                                {capitalizeFirstLetter(name)}
                            </ChooseButton>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex gap-[15px]">
                <AdminRecentActions actions={filteredActions} />
                <div className="grid grid-cols-1 gap-[15px] w-1/3 bg-white/5 p-4 rounded-xl border border-white/10">
                    <h3 className="font-semibold">Зведення</h3>

                    <div className="flex flex-col gap-[10px]">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            Всього дій: {actions?.length || 0}
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            Остання дія:{" "}
                            {actions?.[0]
                                ? `${actions[0].action} (${formatDate(
                                      actions[0].createdAt
                                  )})`
                                : "—"}
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            Додано:{" "}
                            {actions?.filter((a) =>
                                a.action.startsWith("Додано")
                            ).length || 0}
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            Редаговано:{" "}
                            {actions?.filter((a) =>
                                a.action.startsWith("Редаговано")
                            ).length || 0}
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            Видалено:{" "}
                            {actions?.filter((a) =>
                                a.action.startsWith("Видалено")
                            ).length || 0}
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            Активна фільтрація: <br />
                            <span className="text-xs opacity-70">
                                Тип — {selectedType}, Об'єкт — {selectedEntity}
                            </span>
                        </div>

                        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                            Унікальних дій:{" "}
                            {new Set(actions?.map((a) => a.action) || []).size}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminAccount;
