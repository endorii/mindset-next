"use client";

import { useGetCategoriesByCollectionId } from "@/features/categories/hooks/useCategories";
import { useGetCollectionByPath } from "@/features/collections/hooks/useCollections";
import {
    CollectionsAndCategoriesList,
    EmptyCategories,
} from "@/shared/components";
import { Breadcrumbs, ErrorWithMessage } from "@/shared/ui/components";
import CollectionsAndCategoriesListSkeleton from "@/shared/ui/skeletons/CollectionsAndCategoriesListSkeleton";
import ShopTitle from "@/shared/ui/titles/ShopTitle";
import { usePathname } from "next/navigation";

export default function CategoriesSlug() {
    const pathname = usePathname();
    const collectionPath = pathname.split("/")[1];

    const {
        data: collection,
        isPending: isCollectionPending,
        isError: isCollectionError,
        error: collectionError,
    } = useGetCollectionByPath(collectionPath);

    const {
        data: categories,
        isPending: isCategoriesPending,
        isError: isCategoriesError,
        error: categoriesError,
    } = useGetCategoriesByCollectionId(collection?.id);

    if (isCollectionError) {
        return (
            <div className="flex flex-col gap-[50px] mt-[30px]">
                <ShopTitle
                    title={`Категорії ${collectionPath}`}
                    subtitle={`Categories ${collectionPath}`}
                />
                <ErrorWithMessage message={collectionError.message} />
            </div>
        );
    }

    if (isCategoriesError) {
        return (
            <div className="flex flex-col gap-[50px] mt-[30px]">
                <ShopTitle
                    title={`Категорії ${collectionPath}`}
                    subtitle={`Categories ${collectionPath}`}
                />
                <ErrorWithMessage message={categoriesError.message} />
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-[50px] mt-[30px]">
            <ShopTitle
                title={`Категорії ${collectionPath}`}
                subtitle={`Categories ${collectionPath}`}
            />
            {categories && categories.length > 0 ? (
                <CollectionsAndCategoriesList
                    basePath={`/${collectionPath}`}
                    items={categories}
                />
            ) : isCategoriesPending || isCollectionPending ? (
                <CollectionsAndCategoriesListSkeleton />
            ) : (
                <EmptyCategories
                    title={"Наш віртуальний склад щойно отримав оновлення..."}
                    subtitle={
                        "Вибачте за незручності — категорії ще в процесі сортування"
                    }
                />
            )}
        </div>
    );
}
