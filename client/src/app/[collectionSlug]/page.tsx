"use client";

import { notFound, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCategories } from "@/lib/hooks/useCategories";
import { useGetCategoriesFromCollection } from "@/lib/hooks/useCollections";

export default function Collection() {
    const pathname = usePathname();
    const collectionPath = pathname.split("/")[1] || "";

    const { data, isError, isLoading } =
        useGetCategoriesFromCollection(collectionPath);

    console.log(data);

    if (isLoading) {
        return <p>Завантаження...</p>;
    }

    if (!data) {
        return notFound();
    }

    if (isLoading) return <p>Завантаження...</p>;
    if (isError || !data) return <p>Колекція не знайдена</p>;

    return (
        <div>
            <h3 className="mt-[30px] text-2xl uppercase font-bold">
                Категорії товарів:
            </h3>
            {data?.categories.length ? (
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[20px] mt-[30px]">
                    {data.categories.map((product, i) => (
                        <li key={i}>
                            <Link
                                href={`/${collectionPath}/${product.path}`}
                                className="relative block group"
                            >
                                <div
                                    className="z-10 absolute top-0 left-0 bg-black text-white px-[25px] py-[15px] text-lg
                                group-hover:bg-transparent group-hover:text-white group-hover:text-3xl group-hover:top-[50%] group-hover:left-[50%] group-hover:translate-x-[-50%] group-hover:translate-y-[-50%] transition-all ease-in-out duration-800"
                                >
                                    {product.name}
                                </div>
                                <Image
                                    className="filter transition-all group-hover:brightness-50 duration-600"
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
