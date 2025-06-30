"use client";

import ChooseCategoryHeader from "@/components/UserPage/ChooseCategoryHeader/ChooseCategoryHeader";
import { useCollections } from "@/lib/hooks/useCollections";
import { ICollection } from "@/types/collection/collection.types";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function CollectionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: collections } = useCollections();

    const pathname = usePathname();
    const collectionPath = pathname.split("/").filter(Boolean)[0] || null;

    const [currentCollection, setCurrentCollection] =
        useState<ICollection | null>(null);

    useEffect(() => {
        if (collectionPath) {
            const foundCollection =
                collections?.find((c) => c.path === collectionPath) || null;
            setCurrentCollection(foundCollection);
        }
    }, [collectionPath]);

    return (
        <>
            <div className="fixed top-[10px] left-[10px] max-w-[600px] z-100 ">
                <ChooseCategoryHeader
                    currentCollection={currentCollection}
                    setCurrentCollection={setCurrentCollection}
                />
            </div>

            <div className="mt-[145px]">{children}</div>
        </>
    );
}
