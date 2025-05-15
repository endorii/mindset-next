"use client";

import ChooseCategoryHeader from "@/components/ChooseCategoryHeader/ChooseCategoryHeader";
import { collections } from "@/data/collections";
import { ICollection } from "@/types/types";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function CollectionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const collectionPath = pathname.split("/").filter(Boolean)[0] || null;

    const [currentCollection, setCurrentCollection] =
        useState<ICollection | null>(null);

    useEffect(() => {
        if (collectionPath) {
            const foundCollection =
                collections.find((c) => c.path === collectionPath) || null;
            setCurrentCollection(foundCollection);
        }
    }, [collectionPath]);

    return (
        <>
            <div className="fixed top-[80px] left-0 w-full z-10">
                <ChooseCategoryHeader
                    currentCollection={currentCollection}
                    setCurrentCollection={setCurrentCollection}
                />
            </div>

            <main className="mt-[185px]">{children}</main>
        </>
    );
}
