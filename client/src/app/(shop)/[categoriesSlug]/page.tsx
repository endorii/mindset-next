"use client";

import { useCollection } from "@/features/collections/hooks/useCollections";
import { CollectionList, EmptyCategories } from "@/shared/components";
import { usePathname } from "next/navigation";

export default function Collection() {
    const pathname = usePathname();
    const collectionPath = pathname.split("/")[1] || "";

    const {
        data: collection,
        isError,
        isPending,
    } = useCollection(collectionPath);

    const categories = collection?.categories || [];

    return (
        <div className="flex flex-col gap-[50px] mt-[30px]">
            {categories.length > 0 && !isError && !isPending ? (
                <CollectionList
                    title={`Категорії ${collectionPath}`}
                    subtitle={`Categories ${collectionPath}`}
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
        </div>
    );
}
