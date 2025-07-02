"use client";

import { notFound, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useCategory } from "@/features/categories/hooks/useCategories";

export default function CategoryPage() {
    const pathname = usePathname();

    const pathSegments = pathname.split("/").filter(Boolean);

    const collectionPath = pathSegments[0];
    const categoryPath = pathSegments[1];

    const { data: category, isLoading } = useCategory(
        collectionPath,
        categoryPath
    );

    if (isLoading) {
        return <p>Завантаження...</p>;
    }

    if (!category) {
        return notFound();
    }

    console.log(category.products[0]?.images);

    return (
        <div className="relative min-h-[45vw]">
            <h3 className="text-xl font-bold text-center text-white text-[200px] leading-[140px]">
                {category.name} {category.collection?.name}
            </h3>
            {category.products.length ? (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-[10px] absolute top-0 left-[50%] translate-x-[-50%] w-full p-[100px] gap-[20px]">
                    {category.products.map((product, i) => (
                        <li key={i}>
                            <Link
                                href={`/${collectionPath}/${categoryPath}/${product.path}`}
                                className="relative flex flex-col gap-[15px] group rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px]"
                            >
                                <Image
                                    className="relative rounded-xl"
                                    width={450}
                                    height={450}
                                    src={`http://localhost:5000/${product.banner}`}
                                    alt={product.name}
                                />
                                <ul className="absolute top-[335px] left-[30px] flex gap-[5px] rounded-[50px] bg-white/5 backdrop-blur-lg border border-white/20 p-[5px]">
                                    {product.productColors.map((color) => (
                                        <li
                                            key={color.color.hexCode}
                                            className="rounded-[50px] w-[20px] h-[20px]"
                                            style={{
                                                backgroundColor:
                                                    color.color.hexCode,
                                            }}
                                        ></li>
                                    ))}
                                </ul>
                                <div className="flex flex-col gap-[15px]">
                                    <div className="flex justify-between items-end">
                                        <div className="text-white text-3xl font-thin">
                                            {product.name}
                                        </div>
                                        <div className="flex gap-[10px]">
                                            <div className="text-xl text-white font-semibold">
                                                {product.price} грн.
                                            </div>
                                            <div className="font-semibold line-through text-lg text-gray-500">
                                                999 грн.
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="border-top border-white/10" />
                                    <div className="flex gap-[15px] text-white justify-between">
                                        <ul className="flex gap-[5px]">
                                            {product.productSizes.map(
                                                (size) => (
                                                    <li
                                                        key={size.size.name}
                                                        className="flex items-center justify-center rounded-[50px] h-[30px] bg-white/5 backdrop-blur-lg border border-white/5 px-[10px] text-sm text-center"
                                                    >
                                                        <div>
                                                            {size.size.name}
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                        <ul className="flex gap-[5px]">
                                            {product.productTypes.map(
                                                (type) => (
                                                    <li
                                                        key={type.type.name}
                                                        className="flex items-center justify-center rounded-[50px] h-[30px] bg-white/5 backdrop-blur-lg border border-white/5 px-[15px] text-sm text-center"
                                                    >
                                                        <div>
                                                            {type.type.name}
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="flex justify-center items-center">
                    <div className="text-white text-center mt-[150px] text-[24px] uppercase font-bold rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[30px] py-[15px]">
                        Тут поки немає товарів, очікуйте
                    </div>
                </div>
            )}
        </div>
    );
}
