"use client";

import Link from "next/link";
import { useCollections } from "@/lib/hooks/useCollections";

export default function HomePage() {
    const { data, error, isLoading, isError } = useCollections();

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
        <div className="relative min-h-[45vw]">
            <h3 className="mt-[100px] text-xl font-bold text-center text-white text-[200px]">
                Колекції
            </h3>
            {data?.length ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-[80px] absolute top-0 left-[50%] translate-x-[-50%] w-full p-[100px] gap-[20px]">
                    {data?.map((collection, i) => {
                        return (
                            <li
                                key={i}
                                className="rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[10px]"
                            >
                                <Link
                                    href={`/${collection.path}`}
                                    className="group flex flex-col"
                                >
                                    <div className="flex flex-col gap-[20px] p-[20px]">
                                        <div className="text-white text-3xl font-thin">
                                            {collection.name}
                                        </div>
                                        <button className="p-[15px] text-white rounded-xl border border-white/10 hover:bg-black/50 transition-all duration-300 disabled:border-white/10 cursor-pointer">
                                            Переглянути колекцію
                                        </button>
                                    </div>
                                    <img
                                        src={`http://localhost:5000/${collection.banner}`}
                                        alt={collection.name}
                                        className="w-full h-[350px] object-cover filter transition-all duration-600 rounded-xl"
                                    />
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>Немає доступних колекцій.</p>
            )}
        </div>
    );
}
