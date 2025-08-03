"use client";

import { useCategory } from "@/features/categories/hooks/useCategories";
import { IProduct } from "@/features/products/types/products.types";
import { EmptyCategories } from "@/shared/components";
import ShopTitle from "@/shared/ui/titles/ShopTitle";
import Image from "next/image";
import Link from "next/link";
import { usePathname, notFound } from "next/navigation";

export default function CategoryPage() {
    const pathname = usePathname();

    const pathSegments = pathname.split("/").filter(Boolean);

    const collectionPath = pathSegments[0];
    const categoryPath = pathSegments[1];

    const { data: category, isLoading } = useCategory(
        collectionPath,
        categoryPath
    );

    const products = category?.products || [];

    if (isLoading) {
        return <p>Завантаження...</p>;
    }

    if (!category) {
        return notFound();
    }

    return (
        <div className="flex flex-col gap-[50px]">
            <ShopTitle
                title={`Товари ${category.collection?.path} / ${category.path}`}
                subtitle={`Products ${category.collection?.path} / ${category.path}`}
            />

            {products && products.length > 0 ? (
                <ul className="grid gap-[20px] w-full px-[30px] grid-cols-4">
                    {products.map((product: IProduct, i: number) => (
                        <li key={i} className="w-full">
                            <Link
                                href={`/${collectionPath}/${categoryPath}/${product.path}`}
                                className="relative flex flex-col gap-[15px] group rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px]"
                            >
                                <div className="absolute flex text-white w-full h-full justify-center items-center bg-black/80 z-1 top-0 left-0 rounded-xl font-thin p-[20px] text-3xl opacity-0 hover:opacity-100 transition-all duration-400">
                                    Переглянути
                                </div>
                                <Image
                                    className="relative rounded-xl"
                                    width={500}
                                    height={0}
                                    src={`http://localhost:5000/${product.banner}`}
                                    alt={product.name}
                                />
                                <ul className="absolute top-[30px] left-[30px] flex gap-[5px] rounded-[50px] bg-white/5 backdrop-blur-lg border border-white/20 p-[5px]">
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
                                <div className="flex flex-col gap-[7px]">
                                    <div className="flex flex-col gap-[10px] flex-wrap">
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
                                    <div
                                        className={`text-sm ${
                                            product.available
                                                ? "text-green-600"
                                                : "text-red-500"
                                        }`}
                                    >
                                        {product.available
                                            ? "В наявності"
                                            : "Немає в наявності"}
                                    </div>

                                    <hr className="border-top border-white/10 mt-[5px]" />
                                    <div className="flex flex-col gap-[3px] text-white justify-between">
                                        <ul className="flex gap-[5px] flex-wrap">
                                            {product.productSizes.map(
                                                (size) => (
                                                    <li
                                                        key={size.size.name}
                                                        className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[5px] text-xs"
                                                    >
                                                        <div>
                                                            {size.size.name}
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                        <ul className="flex gap-[5px] flex-wrap">
                                            {product.productTypes.map(
                                                (type) => (
                                                    <li
                                                        key={type.type.name}
                                                        className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[5px] text-xs"
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
                <EmptyCategories
                    title={"Наш віртуальний склад щойно отримав оновлення..."}
                    subtitle={
                        "Вибачте за незручності — товари ще в процесі сортування"
                    }
                />
            )}
        </div>
    );
}
