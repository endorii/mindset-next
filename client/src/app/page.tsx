"use client";

import { collections } from "@/data/collections";
import Link from "next/link";
import { useGetAllCollectionsQuery } from "../lib/features/collections/collections.Slice";
import AddCollection from "@/components/AddCollections";
import { useEffect } from "react";
import { ICollection } from "@/types/types";

export default function HomePage() {
    const { data, isError, isLoading } = useGetAllCollectionsQuery();

    console.log({ data, isError, isLoading });

    return (
        <>
            <div>
                <h3 className="mt-[30px] text-xl uppercase font-bold">
                    Колекції
                </h3>
                {AddCollection()}
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-[30px]">
                    {data?.map((collection: ICollection, i: string) => (
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
                                    src={collection.banner}
                                    alt={collection.name}
                                    className="w-full h-[100vh] object-cover filter transition-all group-hover:brightness-50 duration-600 "
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
