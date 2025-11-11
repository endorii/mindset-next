"use client";

import { AdminRecentActions } from "@/shared/components";
import { useMemo, useState } from "react";
import { FilterSection } from "../../attributes/components/FilterSection";
import { useRecentActions } from "../../recent-actions/hooks/useRecentActions";

export function AdminAccountContent() {
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

    const [selectedType, setSelectedType] = useState("Всі");
    const [selectedEntity, setSelectedEntity] = useState("Всі");
    const [selectedSort, setSelectedSort] = useState("Спочатку новіші");

    const { data: actions } = useRecentActions();

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
        <>
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

            <AdminRecentActions actions={filteredActions} />
        </>
    );
}
