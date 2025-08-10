"use client";

import { useGetCollections } from "@/features/collections/hooks/useCollections";
import {
    CollectionsAndCategoriesList,
    EmptyCategories,
    Welcome,
} from "@/shared/components";
import CollectionsAndCategoriesListSkeleton from "@/shared/ui/skeletons/CollectionsAndCategoriesListSkeleton";

import ShopTitle from "@/shared/ui/titles/ShopTitle";

export default function HomePage() {
    const { data: collections, isPending: isCollectionsPending } =
        useGetCollections();

    return (
        <div>
            <Welcome />
            <div className="flex flex-col gap-[50px]">
                <ShopTitle title="Колекції" subtitle="Collections" />
                {collections && collections.length > 0 ? (
                    <CollectionsAndCategoriesList items={collections} />
                ) : isCollectionsPending ? (
                    <CollectionsAndCategoriesListSkeleton />
                ) : (
                    <EmptyCategories
                        title={
                            "Наш віртуальний склад щойно отримав оновлення..."
                        }
                        subtitle={
                            "Вибачте за незручності — колекції ще в процесі сортування"
                        }
                    />
                )}
            </div>
        </div>
    );
}
