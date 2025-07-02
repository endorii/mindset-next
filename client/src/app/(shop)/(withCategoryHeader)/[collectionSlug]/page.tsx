"use client";

import { notFound, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCollection } from "@/features/collections/hooks/useCollections";

export default function Collection() {
    const pathname = usePathname();
    const collectionPath = pathname.split("/")[1] || "";

    const {
        data: collection,
        isError,
        isLoading,
    } = useCollection(collectionPath);

    console.log(collection);

    if (isLoading) {
        return <p>Завантаження...</p>;
    }

    if (!collection) {
        return notFound();
    }

    if (isLoading) return <p>Завантаження...</p>;
    if (isError || !collection) return <p>Колекція не знайдена</p>;

    return (
        <div className="relative min-h-[45vw]">
            <h3 className="text-xl font-bold text-center text-white text-[200px] leading-[140px]">
                Категорії {collection.name}
            </h3>
            {collection?.categories.length ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-[10px] absolute top-0 left-[50%] translate-x-[-50%] w-full p-[100px] gap-[20px]">
                    {collection.categories.map((product, i) => (
                        <li key={i}>
                            <Link
                                href={`/${collectionPath}/${product.path}`}
                                className="flex flex-col gap-[15px] group rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px]"
                            >
                                <div className="text-white text-3xl font-thin">
                                    {product.name}
                                </div>
                                <Image
                                    className="rounded-xl"
                                    width={450}
                                    height={450}
                                    src={`http://localhost:5000/${product.banner}`}
                                    alt={product.name}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex justify-center items-center">
                    <div className="text-white text-center mt-[150px] text-[24px] uppercase font-bold rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[30px] py-[15px]">
                        Тут поки немає категорій, але вони скоро з'являться
                    </div>
                </div>
            )}
        </div>
    );
}
