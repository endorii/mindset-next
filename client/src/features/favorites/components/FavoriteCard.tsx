"use client";

import Link from "next/link";
import Image from "next/image";
import { IFavoriteItem } from "../types/favorites.types";

interface FavoriteCardProps {
    item: IFavoriteItem;
    onRemove: () => void;
}

export default function FavoriteCard({ onRemove, item }: FavoriteCardProps) {
    const { product, color, size, type } = item;

    return (
        <li className="relative group rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="flex items-center justify-between flex-col absolute top-0 right-0 z-10 w-full h-full bg-black/80 opacity-0 group-hover:opacity-100 transition-all duration-400 rounded-xl">
                <button
                    onClick={onRemove}
                    className="text-3xl uppercase font-thin text-white/60 hover:text-red-500 h-[30%] w-full transition-all duration-300 cursor-pointer"
                >
                    Вилучити
                </button>
                <hr className="border w-full border-t border-white/30" />
                <Link
                    href={`${product.category?.collection?.path}/${product.category?.path}/${product.path}`}
                    className="flex justify-center items-center w-full h-[70%]"
                >
                    <button className="text-3xl uppercase font-thin text-white/60 hover:text-white h-full w-full transition-all duration-300 cursor-pointer">
                        Переглянути
                    </button>
                </Link>

                <hr />
            </div>

            <div className="flex flex-col gap-[15px]  ">
                <Image
                    src={`http://localhost:5000/${product.banner}`}
                    alt={product.name}
                    width={450}
                    height={450}
                    className="rounded-xl"
                />
                <div className="flex flex-col justify-between text-white gap-[15px]">
                    <div className="flex justify-between items-end flex-wrap gap-[10px]">
                        <div className="text-white text-3xl font-thin">
                            {product.name}
                        </div>
                        <div className="flex gap-[10px]">
                            <div className="text-xl text-white font-semibold">
                                {product.price} грн.
                            </div>
                            <div className="font-semibold line-through text-lg text-gray-500">
                                {product.oldPrice} грн.
                            </div>
                        </div>
                    </div>
                    <hr className="border-top border-white/10" />
                    <div className="flex gap-[10px]">
                        {color ? (
                            <div className="flex gap-[7px] items-center">
                                <div className="text-sm">Колір: </div>
                                <div className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[7px] text-sm">
                                    {color}
                                </div>
                            </div>
                        ) : null}
                        {type ? (
                            <div className="flex gap-[7px] items-center">
                                <div className="text-sm">Тип: </div>
                                <div className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[7px] text-sm">
                                    {type}
                                </div>
                            </div>
                        ) : null}
                        {size ? (
                            <div className="flex gap-[7px] items-center">
                                <div className="text-sm">Розмір: </div>
                                <div className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[7px] text-sm">
                                    {size}
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </li>
    );
}
