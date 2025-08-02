"use client";

import { ICategory } from "@/features/categories/types/categories.types";
import { useCollection } from "@/features/collections/hooks/useCollections";
import Link from "next/link";
import { usePathname, notFound } from "next/navigation";

export default function Collection() {
    const pathname = usePathname();
    const collectionPath = pathname.split("/")[1] || "";

    console.log(collectionPath);

    const {
        data: collection,
        isError,
        isLoading,
    } = useCollection(collectionPath);

    const categories = collection?.categories || [];

    console.log(collection, categories);

    if (isLoading) {
        return <p>Завантаження...</p>;
    }

    if (!collection) {
        return notFound();
    }

    if (isLoading) return <p>Завантаження...</p>;
    if (isError || !collection) return <p>Колекція не знайдена</p>;

    return (
        <div className="flex flex-col gap-[50px] mt-[30px]">
            <div className="text-white relative px-[70px]">
                <div className="text-8xl font-extrabold">
                    Категорії {collection.name}
                </div>
                <div className="absolute top-[40px] left-[70px] text-8xl font-qwitcher-grypen text-white/40">
                    Categories {collection.name}
                </div>
            </div>

            {categories && categories.length > 0 ? (
                <ul className="flex flex-col w-full ">
                    {categories.map((category: ICategory, i: number) => (
                        <li key={i} className="relative cursor-pointer">
                            <div className="absolute opacity-0 hover:opacity-100 bg-black/80 backdrop-blur-xl w-full h-full font-thin text-3xl text-white z-[1] transition-all duration-400 flex items-center justify-center">
                                {i % 2 === 0 ? (
                                    <>
                                        <Link
                                            className="flex items-center pl-[9%] w-full h-full"
                                            href={`${collection.path}/${category.path}`}
                                        >
                                            <div className="border-b">
                                                Переглянути
                                            </div>
                                        </Link>
                                        <div className="absolute top-[50%] translate-y-[-50%] right-[2%] w-[20%] text-base text-white">
                                            {category.description}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="absolute top-[50%] translate-y-[-50%] left-[2%] w-[20%] text-base text-white">
                                            {category.description}
                                        </div>
                                        <Link
                                            className="flex items-center pr-[9%] w-full h-full justify-end"
                                            href={`${collection.path}/${category.path}`}
                                        >
                                            <div className="border-b">
                                                Переглянути
                                            </div>
                                        </Link>
                                    </>
                                )}
                            </div>
                            <div className="group flex flex-col">
                                <div
                                    className={`absolute bg-black/25 border border-white/10 shadow-xl px-[50px] py-[15px] backdrop-blur-lg rounded-xl top-[50%] translate-y-[-50%] text-white text-3xl font-thin 
                                ${
                                    i % 2 === 0
                                        ? "left-[10%] translate-x-[-10%]"
                                        : "right-[10%] translate-x-[10%]"
                                } 
                            `}
                                >
                                    {category.name}
                                </div>
                                <img
                                    src={`http://localhost:5000/${category.banner}`}
                                    alt={category.name}
                                    className="w-full h-[700px] object-cover filter transition-all duration-600"
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="p-[30px]">
                    <div className="relative">
                        <div className="absolute opacity-0 hover:opacity-100 bg-black/80 backdrop-blur-xl w-full h-full font-thin text-3xl text-white z-[1] transition-all duration-400 flex items-center justify-center">
                            <div className="absolute top-[50%] translate-y-[-50%] left-[2%] w-[20%] text-base text-white">
                                Наш віртуальний склад щойно отримав оновлення, і
                                ми активно наводимо порядок. Кожна річ проходить
                                ретельну перевірку, щоб потрапити у правильну
                                категорію. Ми хочемо, щоб вам було легко
                                знаходити те, що потрібно, без зайвого клопоту.
                                Тому зараз усе тимчасово приховано — але це лише
                                на мить. За кулісами вже кипить робота, і скоро
                                все стане на свої місця. Нові товари, стильні
                                добірки та зручна навігація вже на шляху до вас.
                                Ми вдосконалюємо наш сайт, щоб зробити шопінг ще
                                приємнішим. Трішки терпіння — і ви побачите
                                оновлені категорії у всій красі. Дякуємо, що
                                залишаєтесь з нами та даруєте нам свою довіру!
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
                                Вибачте за незручності — категорії ще в процесі
                                сортування
                            </div>
                            <img
                                src={`images/studio.png`}
                                alt={"123"}
                                className="w-full h-[500px] object-cover filter transition-all duration-600"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
