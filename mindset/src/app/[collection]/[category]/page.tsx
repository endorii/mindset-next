"use client";

import { notFound, usePathname } from "next/navigation";
import Link from "next/link";
import { collections } from "@/data/collections";
import Image from "next/image";

export default function CategoryPage() {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    const collectionPath = pathSegments[0];
    const categoryPath = pathSegments[1];

    const collection = collections.find((c) => c.path === collectionPath);
    const category = collection?.categories.find(
        (cat) => cat.path === categoryPath
    );

    if (!category) {
        return notFound();
    }

    return (
        <div>
            <h3 className="mt-[30px] text-2xl uppercase font-bold">
                Доступні товари:
            </h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[20px] mt-[30px]">
                {category.products.map((product, i) => (
                    <li key={i}>
                        <Link
                            href={`/${collectionPath}/${categoryPath}/${product.path}`}
                            className="relative block"
                        >
                            <div
                                className="absolute top-0 left-0 bg-black text-white px-[25px] py-[15px] text-lg z-10 
                                group-hover:bg-white group-hover:text-black transition-colors duration-300"
                            >
                                {product.name}
                            </div>
                            <Image
                                width={450}
                                height={450}
                                src={product.images[0]}
                                alt={product.name}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
