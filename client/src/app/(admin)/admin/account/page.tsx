"use client";

import { FilterSection } from "@/features/admin/attributes/components/FilterSection";
import Title from "@/features/admin/attributes/components/Title";
import { useRecentActions } from "@/features/admin/recent-actions/hooks/useRecentActions";
import { AdminRecentActions } from "@/shared/components";
import {
    FilterSectionSkeleton,
    RecentActionsSkeleton,
    TitleWithButtonSkeleton,
} from "@/shared/ui/skeletons";
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
    const [selectedType, setSelectedType] = useState("Всі");
    const [selectedEntity, setSelectedEntity] = useState("Всі");
    const [selectedSort, setSelectedSort] = useState("Спочатку новіші");

    const {
        data: actions,
        isPending: isActionsPending,
        isError: isActionsError,
    } = useRecentActions();

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

    if (isActionsPending) {
        return (
            <div className="flex flex-col gap-[15px]">
                <TitleWithButtonSkeleton />
                <FilterSectionSkeleton />
                <FilterSectionSkeleton />
                <FilterSectionSkeleton />
                <RecentActionsSkeleton />
            </div>
        );
    }

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

            <AdminRecentActions
                isActionsError={isActionsError}
                actions={filteredActions}
            />
        </div>
    );
}

export default AdminAccount;
