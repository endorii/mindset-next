"use client";

import {
    CollectionsAndCategoriesList,
    EmptyCategories,
} from "@/shared/components";
import { ICollection } from "../types/collections.types";

export default function CollectionsSection({
    collections,
}: {
    collections: ICollection[];
}) {
    if (!collections?.length) {
        return (
            <EmptyCategories
                title="Наш віртуальний склад щойно отримав оновлення..."
                subtitle="Вибачте за незручності — колекції ще в процесі сортування"
            />
        );
    }

    return <CollectionsAndCategoriesList items={collections} />;
}
