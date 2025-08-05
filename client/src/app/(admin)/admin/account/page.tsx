"use client";

import { FilterSection } from "@/features/admin/attributes/components/FilterSection";
import Title from "@/features/admin/attributes/components/Title";
import { useRecentActions } from "@/features/admin/recent-actions/hooks/useRecentActions";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { AdminRecentActions } from "@/shared/components";
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
            <Title title="Акаунт адміністратора" />

            <FilterSection
                title="Фільтрувати за дією:"
                filters={actionTypeFilters}
                onFilterClick={(filter) => setSelectedType(filter)}
                selectedItem={selectedType}
            />

            <FilterSection
                title="Фільтрувати за об'єктом:"
                filters={entityFilters}
                onFilterClick={(filter) => setSelectedEntity(filter)}
                selectedItem={selectedEntity}
            />

            <FilterSection
                title="Сортування:"
                filters={sortFilters}
                onFilterClick={(filter) => setSelectedSort(filter)}
                selectedItem={selectedSort}
            />

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
