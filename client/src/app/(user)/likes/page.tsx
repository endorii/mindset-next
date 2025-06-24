"use client";

import React from "react";
import Link from "next/link";
import CloseIcon from "@/components/Icons/CloseIcon";
import { IFavoriteItem } from "@/types/favorite/favorite.types";
import { useUser } from "@/lib/hooks/useUsers";
import Image from "next/image";

function Likes() {
    const { data: user, isLoading, error } = useUser("");

    const favouritesItems: IFavoriteItem[] = user?.favorites || [];

    if (!favouritesItems || favouritesItems.length === 0) {
        return (
            <div className="pt-[30px] text-center text-[50px]">
                Увійдіть щоб мати можливість додавати товари у "Вподобане"
            </div>
        );
    }

    if (isLoading) {
        return <p>Завантаження кошика...</p>;
    }

    if (error) {
        return (
            <p>
                Помилка завантаження кошика:{" "}
                {error.message || "Невідома помилка"}
            </p>
        );
    }

    return (
        <div>
            <h3 className="mt-[30px] text-xl uppercase font-bold">Улюблене:</h3>
            {favouritesItems.length > 0 ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[20px] mt-[30px]">
                    {favouritesItems.map((item, i) => {
                        const { product } = item;

                        if (!product) return null;

                        return (
                            <li key={i} className="relative">
                                <button className="absolute top-0 right-0 group flex text-xs items-center gap-[20px] border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white p-[10px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed">
                                    <CloseIcon className="w-[20px] stroke-white group-hover:stroke-black transition-all duration-300" />
                                </button>
                                <Link
                                    href={`${product.category?.collection?.path}/${product.category?.path}/${product.path}`}
                                >
                                    <Image
                                        src={`http://localhost:5000/${product.banner}`}
                                        alt={product.name}
                                        width={450}
                                        height={450}
                                    />
                                    <div className="px-[20px] py-[15px] flex justify-between">
                                        <div>
                                            <div className="text-lg font-medium">
                                                {product.name}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {product.price} грн.
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                "Товарів не знайдено"
            )}
        </div>
    );
}

export default Likes;
