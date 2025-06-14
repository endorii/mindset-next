import React from "react";

import { user } from "@/data/user";
import { collections } from "@/data/collections";
import Link from "next/link";
import CloseIcon from "@/components/Icons/CloseIcon";

function Likes() {
    const getProductWithPathInfo = (productPath: string) => {
        for (const collection of collections) {
            for (const category of collection.categories) {
                for (const product of category.products) {
                    if (product.path === productPath) {
                        return {
                            product,
                            categoryPath: category.path,
                            collectionPath: collection.path,
                        };
                    }
                }
            }
        }
        return null;
    };

    const favouritesItems = user?.favorites;

    if (!favouritesItems || favouritesItems.length === 0) {
        return (
            <div className="pt-[30px] text-center text-[50px]">
                Увійдіть щоб мати можливість додавати товари у "Вподобане"
            </div>
        );
    }

    return (
        <div>
            <h3 className="mt-[30px] text-xl uppercase font-bold">Улюблене:</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[20px] mt-[30px]">
                {favouritesItems.map((item: any, i: number) => {
                    const result = getProductWithPathInfo(item.productPath);
                    if (!result) return null;

                    const { product, categoryPath, collectionPath } = result;

                    return (
                        <li key={i} className="relative">
                            <button className="absolute top-0 right-0 group flex text-xs items-center gap-[20px] border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white p-[10px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed">
                                <CloseIcon className="w-[20px] stroke-white group-hover:stroke-black transition-all duration-300" />
                            </button>
                            <Link
                                href={`/${collectionPath}/${categoryPath}/${product.path}`}
                            >
                                <img
                                    src={product.images[0]}
                                    alt={product.name}
                                    className="w-full h-auto"
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
        </div>
    );
}

export default Likes;
