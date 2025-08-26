"use client";

import {
    CollectionsAndCategoriesList,
    EmptyCategories,
} from "@/shared/components";
import { ICategory } from "../types/categories.types";

export default function CategoriesSection({
    collectionPath,
    categories,
}: {
    collectionPath: string;
    categories: ICategory[] | undefined;
}) {
    if (!categories || categories.length < 0) {
        return (
            <EmptyCategories
                title="Наш віртуальний склад щойно отримав оновлення..."
                subtitle="Вибачте за незручності — категорії ще в процесі сортування"
            />
        );
    }

    return (
        <CollectionsAndCategoriesList
            basePath={collectionPath}
            items={categories}
        />
    );
}
