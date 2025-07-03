"use client";

import { notFound, usePathname } from "next/navigation";
import { useCollection } from "@/features/collections/hooks/useCollections";
import H3 from "@/shared/ui/text/H3";
import DataListWrapper from "@/shared/ui/wrappers/DataListWrapper";
import CategoryCard from "@/features/categories/components/CategoryCard";

export default function Collection() {
    const pathname = usePathname();
    const collectionPath = pathname.split("/")[1] || "";

    const {
        data: collection,
        isError,
        isLoading,
    } = useCollection(collectionPath);

    const categories = collection?.categories || [];

    if (isLoading) {
        return <p>Завантаження...</p>;
    }

    if (!collection) {
        return notFound();
    }

    if (isLoading) return <p>Завантаження...</p>;
    if (isError || !collection) return <p>Колекція не знайдена</p>;

    return (
        <div className="relative">
            <H3>Категорії {collection.name}</H3>
            <DataListWrapper
                existData={categories}
                alternativeText={"Категорії відсутні"}
            >
                {(item, i) => (
                    <CategoryCard
                        collectionPath={collectionPath}
                        item={item}
                        i={i}
                        key={i}
                    />
                )}
            </DataListWrapper>
        </div>
    );
}
