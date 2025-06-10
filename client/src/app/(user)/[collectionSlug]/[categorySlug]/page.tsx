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

    console.log(data.products[0]?.images);

    return (
        <div>
            <h3 className="mt-[30px] text-2xl uppercase font-bold">
                Доступні товари:
            </h3>
            {data.products.length ? (
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[20px] mt-[30px]">
                    {data.products.map((product, i) => (
                        <li
                            key={i}
                            className=" p-[2px] group hover:bg-black transition-all duration-300"
                        >
                            <Link
                                href={`/${collectionPath}/${categoryPath}/${product.path}`}
                            >
                                <Image
                                    className=""
                                    width={450}
                                    height={450}
                                    src={`http://localhost:5000/${product.banner}`}
                                    alt={product.name}
                                />
                                <div className="flex flex-col p-[10px]">
                                    <div className="group-hover:text-white font-semibold">
                                        {product.name}
                                    </div>
                                    <div className="flex gap-[10px]">
                                        <div className="font-semibold group-hover:text-white">
                                            {product.price} грн.
                                        </div>
                                        <div className="font-semibold line-through text-gray-500 group-hover:text-gray-300">
                                            999 грн.
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Товарів не знайдено</p>
            )}
        </div>
    );
}
