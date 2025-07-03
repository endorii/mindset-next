"use client";

import { useCollections } from "@/features/collections/hooks/useCollections";
import { ICollection } from "@/features/collections/types/collections.types";
import Link from "next/link";

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
                    <li
                        key={i}
                        className={`border border-white/10 bg-black/80 shadow-lg rounded-xl hover:bg-white transition-colors duration-300  hover:text-black w-[100px] text-center cursor-pointer ${
                            collection.path === currentCollection?.path
                                ? "bg-white text-black"
                                : "bg-none text-white"
                        }`}
                    >
                        <Link
                            href={`/${collection.path}`}
                            onClick={() => setCurrentCollection(collection)}
                            className="block px-4 py-2 cursor-pointer "
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
