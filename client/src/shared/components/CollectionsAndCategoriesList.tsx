"use client";

import Link from "next/link";
import Image from "next/image";
import { ICollection } from "@/features/collections/types/collections.types";
import { ICategory } from "@/features/categories/types/categories.types";

interface CollectionsAndCategoriesListProps {
    items: ICollection[] | ICategory[];
    basePath?: string;
}

export default function CollectionsAndCategoriesList({
    items,
    basePath = "",
}: CollectionsAndCategoriesListProps) {
    return (
        <div className="flex flex-col w-full">
            {items.map((item, i) => (
                <div key={i} className="relative cursor-pointer">
                    <div className="absolute opacity-0 hover:opacity-100 bg-black/80 backdrop-blur-xl w-full h-full font-thin text-3xl text-white z-[1] transition-all duration-400 flex items-center justify-center">
                        {i % 2 === 0 ? (
                            <>
                                <Link
                                    className="flex items-center w-full h-full justify-center"
                                    href={`${basePath}/${item.path}`}
                                >
                                    <div className="border-b border-transparent hover:border-white">
                                        Переглянути
                                    </div>
                                </Link>
                                {item.description && (
                                    <div className="absolute md:hidden top-[50%] translate-y-[-50%] right-[2%] w-[20%] text-base text-white">
                                        {item.description}
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {item.description && (
                                    <div className="absolute md:hidden top-[50%] translate-y-[-50%] left-[2%] w-[20%] text-base text-white">
                                        {item.description}
                                    </div>
                                )}
                                <Link
                                    className="flex items-center w-full h-full justify-center"
                                    href={`${basePath}/${item.path}`}
                                >
                                    <div className="border-b border-transparent hover:border-white">
                                        Переглянути
                                    </div>
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="group flex flex-col">
                        <div
                            className={`absolute bg-black/25 border border-white/10 shadow-xl px-[50px] py-[15px] backdrop-blur-lg rounded-xl top-[50%] translate-y-[-50%] text-white text-3xl font-thin 
                ${
                    i % 2 === 0
                        ? "left-[10%] md:left-[50%] translate-x-[-10%] md:translate-x-[-50%]"
                        : "right-[10%] md:right-[50%] translate-x-[10%] md:translate-x-[50%]"
                }`}
                        >
                            {item.name}
                        </div>
                        <Image
                            src={`http://localhost:5000/${item.banner}`}
                            alt={item.name}
                            width={2000}
                            height={700}
                            className="w-full h-[750px] object-cover filter transition-all duration-600"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
