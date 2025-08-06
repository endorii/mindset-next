"use client";

import { useCollections } from "@/features/collections/hooks/useCollections";
import { CollectionList, EmptyCategories, Welcome } from "@/shared/components";

export default function HomePage() {
    const { data: collections, error, isPending, isError } = useCollections();

    return (
        <div className="">
            <Welcome />
            {collections && collections.length > 0 && !isPending && !isError ? (
                <CollectionList
                    title="Колекції"
                    subtitle="Collections"
                    items={collections}
                />
            ) : (
                <EmptyCategories
                    title={"Наш віртуальний склад щойно отримав оновлення..."}
                    subtitle={
                        "Вибачте за незручності — колекції ще в процесі сортування"
                    }
                />
            )}
        </div>
    );
}
