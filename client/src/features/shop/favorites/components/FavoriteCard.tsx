"use client";

import { IProduct } from "@/features/products/types/products.types";
import Image from "next/image";
import Link from "next/link";

interface FavoriteCardProps {
    product: IProduct;
    onRemove: () => void;
}

export function FavoriteCard({ onRemove, product }: FavoriteCardProps) {
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
                            <div className="font-semibold line-through text-lg text-white/60">
                                {product.oldPrice} грн.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </li>
    );
}
