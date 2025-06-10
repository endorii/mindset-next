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
        <>
            <div>
                <h3 className="mt-[30px] text-xl uppercase font-bold">
                    Колекції
                </h3>
                {data?.length ? (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-[30px]">
                        {data?.map((collection, i) => {
                            return (
                                <li key={i}>
                                    <Link
                                        href={`/${collection.path}`}
                                        className="relative group"
                                    >
                                        <div
                                            className="absolute top-0 left-0 bg-black text-white px-[25px] py-[15px] text-lg z-10 
                        group-hover:bg-transparent group-hover:text-white group-hover:text-4xl
                        group-hover:top-[50%] group-hover:left-[50%] group-hover:translate-x-[-50%] group-hover:translate-y-[-50%] transition-all ease-in-out duration-800"
                                        >
                                            {collection.name}
                                        </div>
                                        <img
                                            src={`http://localhost:5000/${collection.banner}`}
                                            alt={collection.name}
                                            className="w-full h-[80vh] object-cover filter transition-all group-hover:brightness-50 duration-600"
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
        </>
    );
}
