"use client";

import { notFound, usePathname } from "next/navigation";
import Link from "next/link";
import { collections } from "@/data/collections";
import Image from "next/image";

export default function Collection() {
    const pathname = usePathname();
    const collectionPath = pathname.split("/")[1] || "";

    const selectedCollection = collections.find(
        (c) => c.path === collectionPath
    );

    if (!selectedCollection) {
        return (
            <div className="pt-[130px] text-center text-[50px]">
                {notFound()}
            </div>
        );
    }

    return (
        <div>
            <h3 className="mt-[30px] text-2xl uppercase font-bold">
                Категорії товарів:
            </h3>
            {selectedCollection.categories?.length ? (
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[20px] mt-[30px]">
                    {selectedCollection.categories.map((product, i) => (
                        <li key={i}>
                            <Link
                                href={`/${selectedCollection.path}/${product.path}`}
                                className="relative block"
                            >
                                <div className="absolute top-0 left-0 bg-black text-white px-[25px] py-[15px] text-lg z-10">
                                    {product.name}
                                </div>
                                <Image
                                    width={450}
                                    height={450}
                                    src={product.banner}
                                    alt={product.name}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-lg">Тут поки немає товарів.</p>
            )}
        </div>
    );
}
