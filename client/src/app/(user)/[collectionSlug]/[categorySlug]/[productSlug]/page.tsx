"use client";

import { usePathname } from "next/navigation";
import HeartIcon from "@/components/Icons/HeartIcon";
import { useProduct } from "@/lib/hooks/useProducts";
import { useState } from "react";

export default function ProductPage() {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    const collectionPath = pathSegments[0];
    const categoryPath = pathSegments[1];
    const productPath = pathSegments[2];

    const { data, isError, error, isLoading } = useProduct(
        collectionPath,
        categoryPath,
        productPath
    );

    const [liked, setLiked] = useState(false);

    console.log(data);

    if (!data) {
        return (
            <div className="pt-[130px] text-center text-[50px]">
                Товар не знайдено 😞
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row mt-[30px] gap-[50px] items-start">
            <div className="flex gap-[10px] relative">
                <div className="relative">
                    <button
                        onClick={() => setLiked(!liked)}
                        className="absolute top-1 right-1 m-[0_auto] text-xs flex justify-center items-center gap-[10px] p-[10px] transition-all duration-300 cursor-pointer w-[60px] h-[60px]"
                    >
                        <HeartIcon
                            className={`transition-all duration-300 ${
                                liked
                                    ? "w-[42px] stroke-white fill-white"
                                    : "w-[35px] stroke-white stroke-[1.5] fill-none"
                            } `}
                        />
                    </button>
                    <img
                        src={`http://localhost:5000/${data.banner}`}
                        alt={data.name}
                        className="max-w-[600px]"
                    />
                </div>

                <ul className="flex flex-col w-[150px] gap-[10px] overflow-y-auto max-h-[600px]">
                    {data.images?.map((image, i) => (
                        <li key={i}>
                            <img
                                src={`http://localhost:5000/${image}`}
                                alt={data.name}
                                className="w-full h-auto"
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-[15px] w-full">
                <div className="flex justify-between">
                    <h3 className="text-2xl font-bold">{data.name}</h3>
                    <div className="text-3xl font-semibold text-gray-800">
                        {data.price} грн.
                    </div>
                </div>

                <div className="text-sm text-gray-500">
                    {data.category?.collection?.name} / {data.category?.name}
                </div>

                <div className="mt-[20px] text-gray-700">
                    {data.description}
                </div>
                <hr className="w-full border-gray-200" />
                <div className="text-gray-600">{data.composition}</div>

                <div
                    className={`text-sm ${
                        data.available ? "text-green-600" : "text-gray-500"
                    }`}
                >
                    {data.available ? "В наявності" : "Немає в наявності"}
                </div>

                {data.productColors.length > 0 ? (
                    <div className="flex flex-col gap-[10px] mt-[10px]">
                        <div>Колір:</div>
                        <ul className="flex gap-[10px]">
                            {data.productColors.map((item, i) => (
                                <li
                                    key={i}
                                    className="px-[15px] py-[8px] border border-gray-200 hover:border-black cursor-pointer"
                                >
                                    {item.color.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    ""
                )}

                {data.productTypes.length > 0 ? (
                    <div className="flex flex-col gap-[10px] mt-[10px]">
                        <div>Тип:</div>
                        <ul className="flex gap-[10px]">
                            {data.productTypes.map((item, i) => (
                                <li
                                    key={i}
                                    className="px-[15px] py-[8px] border border-gray-200 hover:border-black cursor-pointer"
                                >
                                    {item.type.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    ""
                )}

                {data.productSizes.length > 0 ? (
                    <div className="flex flex-col gap-[10px] mt-[10px]">
                        <div>Розмір:</div>
                        <ul className="flex gap-[10px]">
                            {data.productSizes.map((item, i) => (
                                <li
                                    key={i}
                                    className="px-[15px] py-[8px] border border-gray-200 hover:border-black cursor-pointer"
                                >
                                    {item.size.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    ""
                )}

                <div className="flex justify-between gap-[15px] mt-[30px]">
                    <button
                        disabled={!data.available}
                        className="w-full border border-transparent hover:border-black hover:bg-white hover:text-black bg-black text-white px-[15px] py-[12px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:border-transparent disabled:text-white"
                    >
                        Купити
                    </button>
                    <button
                        disabled={!data.available}
                        className="w-full border border-transparent hover:border-black hover:bg-white hover:text-black bg-black text-white px-[15px] py-[12px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:border-transparent disabled:text-white"
                    >
                        В кошик
                    </button>
                </div>
            </div>
        </div>
    );
}
