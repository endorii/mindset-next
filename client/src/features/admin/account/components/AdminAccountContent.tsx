"use client";

import { AdminRecentActions } from "@/shared/components";
import { FiltersWrapper } from "@/shared/components/layout";
import { useMemo, useState } from "react";
import { FilterSection } from "../../attributes/components/FilterSection";
import { useRecentActions } from "../../recent-actions/hooks/useRecentActions";

export function AdminAccountContent() {
    const actionTypeFilters = ["Added", "Edited", "Deleted"];
    const entityFilters = [
        "Collection",
        "Category",
        "Product",
        "Color",
        "Type",
        "Size",
    ];
    const sortFilters = ["Newer first", "First the older ones"];

    const [selectedType, setSelectedType] = useState("");
    const [selectedEntity, setSelectedEntity] = useState("");
    const [selectedSort, setSelectedSort] = useState("Newer first");

    const { data: actions } = useRecentActions();

    const filteredActions = useMemo(() => {
        if (!actions) return [];

        let result = actions.filter((action) => {
            const isTypeMatch =
                selectedType === "" || action.action.startsWith(selectedType);
            const isEntityMatch =
                selectedEntity === "" || action.action.includes(selectedEntity);
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

    const resetFilters = () => {
        setSelectedType("");
        setSelectedEntity("");
        setSelectedSort("Newer first");
    };

    return (
        <div className="flex flex-col gap-[20px] bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] w-full">
            <FiltersWrapper resetFilters={resetFilters}>
                <FilterSection
                    title="Filter by action"
                    filters={actionTypeFilters}
                    onFilterClick={setSelectedType}
                    selectedItem={selectedType}
                />

                <FilterSection
                    title="Filter by object"
                    filters={entityFilters}
                    onFilterClick={setSelectedEntity}
                    selectedItem={selectedEntity}
                />

                <FilterSection
                    title="Sorting"
                    filters={sortFilters}
                    onFilterClick={setSelectedSort}
                    selectedItem={selectedSort}
                />
            </FiltersWrapper>

            <AdminRecentActions actions={filteredActions} />
        </div>
    );
}
