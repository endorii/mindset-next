"use client";

import { collections } from "@/data/collections";
import Link from "next/link";
import { ICollection } from "@/types/types";

interface ChooseCategoryHeaderProps {
    currentCollection: ICollection | null;
    setCurrentCollection: (collection: ICollection | null) => void;
}

const ChooseCategoryHeader = ({
    setCurrentCollection,
}: ChooseCategoryHeaderProps) => {
    return (
        <div className="bg-gray-100 py-4 z-10">
            <ul className="flex justify-center gap-4">
                {collections.map((collection, i) => (
                    <li
                        key={i}
                        className="border border-gray-300 hover:bg-black hover:text-white transition-colors duration-300"
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
