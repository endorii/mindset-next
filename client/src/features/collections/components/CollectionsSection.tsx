"use client";

import {
    CollectionsAndCategoriesList,
    EmptyCategories,
} from "@/shared/components";
import { ShopTitle } from "@/shared/ui/titles/ShopTitle";
import { ICollection } from "../types/collections.types";

export function CollectionsSection({
    collections,
}: {
    collections: ICollection[];
}) {
    if (!collections?.length) {
        return (
            <EmptyCategories
                title="Warehouse is in the process of being prepared..."
                subtitle="Sorry for the inconvenience - we are preparing the best collections for you."
            />
        );
    }

    return (
        <div className="flex flex-col gap-[10px] pt-[90px]" id="collections">
            <ShopTitle title="Collections" />
            <CollectionsAndCategoriesList items={collections} />
        </div>
    );
}
