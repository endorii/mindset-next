"use client";

import { AdminRecentActions } from "@/shared/components";
import { useMemo, useState } from "react";
import { FilterSection } from "../../attributes/components/FilterSection";
import { useRecentActions } from "../../recent-actions/hooks/useRecentActions";

export function AdminAccountContent() {
    const actionTypeFilters = ["All", "Added", "Edited", "Deleted"];
    const entityFilters = [
        "All",
        "collection",
        "category",
        "product",
        "color",
        "type",
        "size",
    ];
    const sortFilters = ["Newer first", "First the older ones"];

    const [selectedType, setSelectedType] = useState("All");
    const [selectedEntity, setSelectedEntity] = useState("All");
    const [selectedSort, setSelectedSort] = useState("Newer first");

    const { data: actions } = useRecentActions();

    const filteredActions = useMemo(() => {
        if (!actions) return [];

        let result = actions.filter((action) => {
            const isTypeMatch =
                selectedType === "All" ||
                action.action.startsWith(selectedType);
            const isEntityMatch =
                selectedEntity === "All" ||
                action.action.includes(selectedEntity);
            return isTypeMatch && isEntityMatch;
        });

        result.sort((a, b) => {
            const aDate = new Date(a.createdAt).getTime();
            const bDate = new Date(b.createdAt).getTime();
            return selectedSort === "First the older ones"
                ? aDate - bDate
                : bDate - aDate;
        });

        return result;
    }, [actions, selectedType, selectedEntity, selectedSort]);
    return (
        <>
            <FilterSection
                title="Filter by action"
                filters={actionTypeFilters}
                onFilterClick={(filter) => setSelectedType(filter)}
                selectedItem={selectedType}
            />

            <FilterSection
                title="Filter by object"
                filters={entityFilters}
                onFilterClick={(filter) => setSelectedEntity(filter)}
                selectedItem={selectedEntity}
            />

            <FilterSection
                title="Sorting"
                filters={sortFilters}
                onFilterClick={(filter) => setSelectedSort(filter)}
                selectedItem={selectedSort}
            />

            <AdminRecentActions actions={filteredActions} />
        </>
    );
}
