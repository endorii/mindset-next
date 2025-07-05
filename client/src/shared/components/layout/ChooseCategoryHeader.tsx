"use client";

import { useCollections } from "@/features/collections/hooks/useCollections";
import { ICollection } from "@/features/collections/types/collections.types";
import ChooseLink from "@/shared/ui/buttons/ChooseLink";

interface ChooseCategoryHeaderProps {
    currentCollection: ICollection | null;
    setCurrentCollection: (collection: ICollection | null) => void;
}

const ChooseCategoryHeader = ({
    currentCollection,
    setCurrentCollection,
}: ChooseCategoryHeaderProps) => {
    const { data: collections, isError, error, isLoading } = useCollections();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return (
            <div>
                Помилка: {error?.message || "Не вдалося отримати колекції"}
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px]">
            <ul className="flex justify-center items-center gap-[10px]">
                {collections?.map((collection, i) => (
                    <li key={i}>
                        <ChooseLink
                            href={`/${collection.path}`}
                            collection={collection}
                            currentCollection={currentCollection}
                            onClick={() => setCurrentCollection(collection)}
                        >
                            {collection.name}
                        </ChooseLink>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChooseCategoryHeader;
