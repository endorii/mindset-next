"use client";

import Link from "next/link";
import Image from "next/image";
import CloseIcon from "@/components/Icons/CloseIcon";
import { IProduct } from "@/types/product/product.types";

interface Props {
    product: IProduct;
    onRemove: () => void;
    index: number;
    id: string | number;
    color: string;
    size: string;
    type: string;
}

export default function FavoriteItemCard({
    product,
    onRemove,
    index,
    id,
    color,
    size,
    type,
}: Props) {
    const key = `${id}-${index}`;

    return (
        <li key={key} className="relative">
            <button
                onClick={onRemove}
                className="absolute top-0 right-0 z-10 group flex text-xs items-center gap-[20px] border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white p-[10px] transition-all duration-300 cursor-pointer"
            >
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
                    <div className="flex gap-[10px] items-center">
                        {color ? (
                            <div className="flex gap-[5px]">
                                <div className="text-gray-700">Колір:</div>
                                <div className="font-semibold">{color}</div>
                            </div>
                        ) : null}
                        {type ? (
                            <div className="flex gap-[5px]">
                                <div className="text-gray-700">Тип:</div>
                                <div className="font-semibold">{type}</div>
                            </div>
                        ) : null}
                        {size ? (
                            <div className="flex gap-[5px]">
                                <div className="text-gray-700">Розмір:</div>
                                <div className="font-semibold">{size}</div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </Link>
        </li>
    );
}
