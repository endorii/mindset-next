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
    if (!categories || categories.length <= 0) {
        return (
            <EmptyCategories
                title="Warehouse is in the process of being prepared..."
                subtitle="Sorry for the inconvenience - we are preparing the best categories for you."
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
