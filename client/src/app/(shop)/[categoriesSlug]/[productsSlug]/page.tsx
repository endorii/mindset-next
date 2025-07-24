"use client";

import { notFound, usePathname } from "next/navigation";
import { useCategory } from "@/features/categories/hooks/useCategories";
import { IProduct } from "@/features/products/types/products.types";
import Link from "next/link";
import Image from "next/image";

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
        <div className="flex flex-col gap-[50px] mt-[30px]">
            <div className="text-white relative px-[70px]">
                <div className="text-8xl font-extrabold">
                    Товари {category.collection?.path} / {category.path}
                </div>
                <div className="absolute top-[40px] left-[70px] text-8xl font-qwitcher-grypen text-white/40">
                    Products {category.collection?.path} / {category.path}
                </div>
            </div>

            {products && products.length > 0 ? (
                <ul className="flex gap-[20px] w-full px-[30px]">
                    {products.map((product: IProduct, i: number) => (
                        <li key={i} className="flex">
                            <Link
                                href={`/${collectionPath}/${categoryPath}/${product.path}`}
                                className="relative flex flex-col gap-[15px] group rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px]"
                            >
                                <div className="absolute flex text-white w-full h-full justify-center items-center bg-black/80 z-1 top-0 left-0 rounded-xl font-thin p-[20px] text-3xl opacity-0 hover:opacity-100 transition-all duration-400">
                                    Переглянути
                                </div>
                                <Image
                                    className="relative rounded-xl"
                                    width={450}
                                    height={450}
                                    src={`http://localhost:5000/${product.banner}`}
                                    alt={product.name}
                                />
                                <ul className="absolute top-[430px] left-[30px] flex gap-[5px] rounded-[50px] bg-white/5 backdrop-blur-lg border border-white/20 p-[5px]">
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
                                    <hr className="border-top border-white/10 mt-[5px]" />
                                    <div className="flex gap-[15px] text-white justify-between">
                                        <ul className="flex gap-[5px]">
                                            {product.productSizes.map(
                                                (size) => (
                                                    <li
                                                        key={size.size.name}
                                                        className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[7px] text-sm"
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
                                                        className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[7px] text-sm"
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
                    <div className="text-white text-center m-[50px] text-[24px] uppercase font-bold rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 px-[30px] py-[15px]">
                        Товари відсутні
                    </div>
                </div>
            )}
        </div>

        // <div className="relative">
        //     <H3>
        //         {category.name} {category.collection?.name}
        //     </H3>
        //     <DataListWrapper
        //         existData={products}
        //         alternativeText={"Товари відстутні"}
        //     >
        // {(item, i) => (
        //     <ProductCard
        //         collectionPath={collectionPath}
        //         categoryPath={categoryPath}
        //         item={item}
        //         i={i}
        //         key={i}
        //     />
        // )}
        //     </DataListWrapper>
        // </div>
    );
}
