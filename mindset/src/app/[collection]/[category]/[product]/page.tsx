"use client";

import { usePathname } from "next/navigation";
import { collections } from "@/data/collections";
import Link from "next/link";

export default function ProductPage() {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    const collectionPath = pathSegments[0];
    const categoryPath = pathSegments[1];
    const productPath = pathSegments[2];

    const collection = collections.find((c) => c.path === collectionPath);
    const category = collection?.categories.find(
        (cat) => cat.path === categoryPath
    );
    const product = category?.products.find((p) => p.path === productPath);

    if (!collection || !category || !product) {
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
                    <button className="absolute top-0 right-0 text-xs flex items-center gap-[10px] border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white p-[10px] transition-all duration-300 cursor-pointer">
                        ❤️
                    </button>
                    <img
                        src={product.images?.[0] || "/placeholder.jpg"}
                        alt={product.name}
                        className="max-w-[600px]"
                    />
                </div>

                <ul className="flex flex-col w-[120px] gap-[10px] overflow-y-auto max-h-[500px]">
                    {product.images?.map((image, i) => (
                        <li key={i}>
                            <img
                                src={image}
                                alt={product.name}
                                className="w-full h-auto"
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col gap-[15px] w-full">
                <div className="flex justify-between">
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                    <div className="text-3xl font-semibold text-gray-800">
                        {product.price} грн.
                    </div>
                </div>

                <div className="text-sm text-gray-500">
                    {collection.name} / {category.name}
                </div>

                <div className="mt-[20px] text-gray-700">
                    {product.description}
                </div>
                <hr className="w-full border-gray-200" />
                <div className="text-gray-600">{product.composition}</div>

                <div
                    className={`text-sm ${
                        product.available ? "text-green-600" : "text-gray-500"
                    }`}
                >
                    {product.available ? "В наявності" : "Немає в наявності"}
                </div>

                {["Тип", "Колір", "Розмір"].map((property) => (
                    <div
                        key={property}
                        className="flex flex-col gap-[10px] mt-[10px]"
                    >
                        <div>{property}:</div>
                        <ul className="flex gap-[10px]">
                            <li className="px-[15px] py-[8px] border border-gray-200 hover:border-black cursor-pointer">
                                {property}
                            </li>
                        </ul>
                    </div>
                ))}

                <div className="flex justify-between gap-[15px] mt-[30px]">
                    <button
                        disabled={!product.available}
                        className="w-full border border-transparent hover:border-black hover:bg-white bg-black text-white px-[15px] py-[12px] transition-all duration-300 cursor-pointer disabled:bg-gray-200"
                    >
                        Купити
                    </button>
                    <button
                        disabled={!product.available}
                        className="w-full border border-transparent hover:border-black hover:bg-white bg-black text-white px-[15px] py-[12px] transition-all duration-300 cursor-pointer disabled:bg-gray-200"
                    >
                        В кошик
                    </button>
                </div>
            </div>
        </div>
    );
}
