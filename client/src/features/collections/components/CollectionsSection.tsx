"use client";

import {
    CollectionsAndCategoriesList,
    EmptyCategories,
} from "@/shared/components";
import { ICollection } from "../types/collections.types";

export function CollectionsSection({
    collections,
}: {
    collections: ICollection[];
}) {
    if (!collections?.length) {
        return (
            <EmptyCategories
                title="Our virtual warehouse just got an update..."
                subtitle="Sorry for the inconvenience - the collections are still in the process of sorting."
            />
        );
    }

    return <CollectionsAndCategoriesList items={collections} />;
}
