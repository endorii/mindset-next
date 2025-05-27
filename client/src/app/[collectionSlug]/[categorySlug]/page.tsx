"use client";

import { notFound, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCategory } from "@/lib/hooks/useCategories";

export default function CategoryPage() {
    const pathname = usePathname();

    const pathSegments = pathname.split("/").filter(Boolean);

    const collectionPath = pathSegments[0];
    const categoryPath = pathSegments[1];

    const { data, isError, error, isLoading } = useCategory(
        collectionPath,
        categoryPath
    );

    if (isLoading) {
        return <p>Завантаження...</p>;
    }

    if (!data) {
        return notFound();
    }

    console.log(data.products[0].images);

    return (
        <div>
            <h3 className="mt-[30px] text-2xl uppercase font-bold">
                Доступні товари:
            </h3>
            {data || isError ? (
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[20px] mt-[30px]">
                    {data.products.map((product, i) => (
                        <li key={i}>
                            <Link
                                href={`/${collectionPath}/${categoryPath}/${product.path}`}
                                className="relative block group"
                            >
                                <div
                                    className="z-[2] absolute top-0 left-0 bg-black text-white px-[25px] py-[15px] text-lg
                                group-hover:bg-transparent group-hover:text-white group-hover:text-3xl group-hover:top-[50%] group-hover:left-[50%] group-hover:translate-x-[-50%] group-hover:translate-y-[-50%] transition-all ease-in-out duration-800"
                                >
                                    <div>{product.name}</div>
                                    <div className="text-lg font-semibold mt-[5px]">
                                        {product.price} грн.
                                    </div>
                                </div>
                                <Image
                                    className="filter transition-all group-hover:brightness-50 duration-600"
                                    width={450}
                                    height={450}
                                    src={product.images[0].url}
                                    alt={product.name}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Колекція не знайдена</p>
            )}
        </div>
    );
}
