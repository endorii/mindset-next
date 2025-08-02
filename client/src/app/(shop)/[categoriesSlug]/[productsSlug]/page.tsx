"use client";

import { useCategory } from "@/features/categories/hooks/useCategories";
import { IProduct } from "@/features/products/types/products.types";
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
        <div className="flex flex-col gap-[50px] mt-[10px]">
            <div className="text-white relative px-[70px]">
                <div className="text-8xl font-extrabold">
                    Товари {category.collection?.path} / {category.path}
                </div>
                <div className="absolute top-[40px] left-[70px] text-8xl font-qwitcher-grypen text-white/40">
                    Products {category.collection?.path} / {category.path}
                </div>
            </div>

            {products && products.length > 0 ? (
                <ul className="grid gap-[20px] w-full px-[30px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
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
                <div className="p-[30px]">
                    <div className="relative">
                        <div className="absolute opacity-0 hover:opacity-100 bg-black/80 backdrop-blur-xl w-full h-full font-thin text-3xl text-white z-[1] transition-all duration-400 flex items-center justify-center">
                            <div className="absolute top-[50%] translate-y-[-50%] left-[2%] w-[20%] text-base text-white">
                                Наші полиці зараз оновлюються, щоб запропонувати
                                вам найкраще з того, що ми готуємо. Можливо,
                                саме зараз нові товари прямують до нашого
                                онлайн-стелажа. Ми ретельно підбираємо кожну
                                річ, щоб вона відповідала вашому стилю та
                                очікуванням. Кожен товар — це не просто продукт,
                                а частинка історії, яку ми хочемо вам
                                розповісти. Незабаром тут з’явиться щось свіже,
                                стильне й актуальне. Ми цінуємо ваш інтерес і
                                вже працюємо над тим, щоб наповнити цю сторінку
                                натхненням. Поки що можете переглянути інші
                                розділи — там на вас чекає багато цікавого. Або
                                залишайтеся з нами — ми обов’язково вас
                                здивуємо! Дякуємо за терпіння й довіру —
                                попереду лише найкраще!
                            </div>
                            <div className="flex flex-col gap-[10px]">
                                <Link
                                    className="flex items-center pr-[9%] w-full h-full"
                                    href={"#"}
                                >
                                    <div className="border-b border-transparent hover:border-white">
                                        Instagram
                                    </div>
                                </Link>
                                <Link
                                    className="flex items-center pr-[9%] w-full h-full"
                                    href={"#"}
                                >
                                    <div className="border-b border-transparent hover:border-white">
                                        Telegram
                                    </div>
                                </Link>
                                <Link
                                    className="flex items-center pr-[9%] w-full h-full"
                                    href={"#"}
                                >
                                    <div className="border-b border-transparent hover:border-white">
                                        Facebook
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="group flex flex-col">
                            <div
                                className={`absolute bg-black/25 border border-white/10 shadow-xl px-[50px] py-[15px] backdrop-blur-lg rounded-xl top-[50%] translate-y-[-50%] text-white text-3xl font-thin left-[10%] translate-x-[-10%]`}
                            >
                                Поки що тут порожньо — але це не надовго
                            </div>
                            <img
                                src={`/images/product.png`}
                                alt={"1234"}
                                className="w-full h-[650px] object-cover filter transition-all duration-500"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
