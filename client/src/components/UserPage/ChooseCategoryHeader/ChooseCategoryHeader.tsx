"use client";

import Link from "next/link";
import { ICollection } from "@/types/types";
import { useCollections } from "@/lib/hooks/useCollections";

interface ChooseCategoryHeaderProps {
    currentCollection: ICollection | null;
    setCurrentCollection: (collection: ICollection | null) => void;
}

const ChooseCategoryHeader = ({
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
        <div className="bg-gray-100 py-4 z-10">
            <ul className="flex justify-center items-center gap-4">
                {collections?.map((collection, i) => (
                    <li
                        key={i}
                        className="border border-gray-300 hover:bg-black hover:text-white transition-colors duration-300 w-[100px] text-center"
                    >
                        <Link
                            href={`/${collection.path}`}
                            onClick={() => setCurrentCollection(collection)}
                            className="block px-4 py-2 cursor-pointer"
                        >
                            {collection.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ChooseCategoryHeader;
