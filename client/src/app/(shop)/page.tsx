"use client";

import { useCollections } from "@/features/collections/hooks/useCollections";
import H3 from "@/shared/ui/text/H3";
import CollectionCard from "@/features/collections/components/CollectionCard";
import DataListWrapper from "@/shared/ui/wrappers/DataListWrapper";

export default function HomePage() {
    const { data: collections, error, isLoading, isError } = useCollections();

    const existCollections = collections || [];

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return (
            <div>
                Помилка: {error?.message || "Не вдалося отримати колекції"}
            </div>
        );
    }

    return (
        <div className="relative px-[100px]">
            <H3>Колекції</H3>
            <DataListWrapper
                existData={existCollections}
                alternativeText="Немає доступних колекцій."
            >
                {(item, i) => <CollectionCard item={item} i={i} key={i} />}
            </DataListWrapper>
        </div>
    );
}
