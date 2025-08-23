"use client";

import {
    CollectionsAndCategoriesList,
    EmptyCategories,
} from "@/shared/components";
import { useGetCollections } from "../hooks/useCollections";

export default function CollectionsContent() {
    const { data: collections } = useGetCollections();

    return (
        <>
            {collections && collections.length > 0 ? (
                <CollectionsAndCategoriesList items={collections} />
            ) : (
                <EmptyCategories
                    title="Наш віртуальний склад щойно отримав оновлення..."
                    subtitle="Вибачте за незручності — колекції ще в процесі сортування"
                />
            )}
        </>
    );
}
