"use client";

import {
    CollectionsAndCategoriesList,
    EmptyCategories,
} from "@/shared/components";
import { ICategory } from "../types/categories.types";

export function CategoriesSection({
    collectionPath,
    categories,
}: {
    collectionPath: string;
    categories: ICategory[] | undefined;
}) {
    if (!categories || categories.length < 0) {
        return (
            <EmptyCategories
                title="Our virtual warehouse just got an update..."
                subtitle="Sorry for the inconvenience — categories are still being sorted."
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
