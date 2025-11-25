"use client";

import { IProduct } from "@/features/products/types/products.types";
import { HeartIcon } from "@/shared/icons";
import Image from "next/image";
import Link from "next/link";

interface FavoriteCardProps {
    product: IProduct;
    onRemove: () => void;
}

export function FavoriteCard({ onRemove, product }: FavoriteCardProps) {
    return (
        <li className="relative text-white">
            <div className="flex flex-col gap-[10px]">
                <div className="relative group">
                    <Image
                        src={product.banner}
                        alt={product.name}
                        width={450}
                        height={450}
                        className="h-[450px] object-cover"
                    />
                    <div className="flex items-center justify-between flex-col absolute top-0 right-0 z-10 w-full h-full bg-black/80 backdrop-blur-lg opacity-0 group-hover:opacity-100 transition-all duration-400 font-perandory tracking-wider text-3xl">
                        <Link
                            href={`${product.category?.collection?.path}/${product.category?.path}/${product.path}`}
                            className="flex justify-center items-center w-full h-full"
                        >
                            <button className="flex text-3xl transition-all  duration-300 border-b border-white">
                                View
                            </button>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col justify-between text-white gap-[5px] px-[10px]">
                    <div className="text-white text-3xl font-perandory tracking-wider">
                        {product.name}
                    </div>
                    <div className="flex gap-[10px] justify-between items-center">
                        <div className="flex gap-[10px]">
                            <div className="text-xl text-white font-semibold">
                                ${product.price}
                            </div>
                            {product.oldPrice && (
                                <div className="font-semibold line-through text-neutral-200">
                                    ${product.oldPrice}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={onRemove}
                            className="group flex transition-all duration-300 cursor-pointer"
                        >
                            <HeartIcon
                                className={`group-hover:fill-none group-hover:stroke-white transition-all duration-300 w-[40px] stroke-red-600 fill-red-600`}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}
