"use client";

import { useGetCollectionByPath } from "@/features/collections/hooks/useCollections";
import { usePathname } from "next/navigation";
import { useGetCategoriesByCollectionId } from "../hooks/useCategories";
import {
    CollectionsAndCategoriesList,
    EmptyCategories,
} from "@/shared/components";

function CategoriesContent() {
    const pathname = usePathname();
    const collectionPath = pathname.split("/")[1];

    const { data: collection } = useGetCollectionByPath(collectionPath);
    const { data: categories } = useGetCategoriesByCollectionId(collection?.id);
    return (
        <>
            {categories && categories.length > 0 ? (
                <CollectionsAndCategoriesList
                    basePath={`/${collectionPath}`}
                    items={categories}
                />
            ) : (
                <EmptyCategories
                    title={"Наш віртуальний склад щойно отримав оновлення..."}
                    subtitle={
                        "Вибачте за незручності — категорії ще в процесі сортування"
                    }
                />
            )}
        </>
    );
}

export default CategoriesContent;
