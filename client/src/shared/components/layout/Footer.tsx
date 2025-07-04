"use client";

import Link from "next/link";
import { InstagramIcon, TelegramIcon, TiktokIcon } from "@/shared/icons";
import { useCollections } from "@/features/collections/hooks/useCollections";
import ChooseLink from "@/shared/ui/buttons/ChooseLink";
import { ICollection } from "@/features/collections/types/collections.types";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Footer = () => {
    const { data: collections, isError, error, isLoading } = useCollections();

    const pathname = usePathname();
    const collectionPath = pathname.split("/").filter(Boolean)[0] || null;

    const [currentCollection, setCurrentCollection] =
        useState<ICollection | null>(null);

    useEffect(() => {
        if (collectionPath) {
            const foundCollection =
                collections?.find((c) => c.path === collectionPath) || null;
            setCurrentCollection(foundCollection);
        }
    }, [collectionPath]);
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return (
            <div>
                Помилка: {error?.message || "Не вдалося отримати колекції"}
            </div>
        );
    }

    return (
        <div className="relative bg-transparent p-[30px] flex justify-between text-white">
            <div className="flex flex-col gap-[25px] w-[350px] text-sm rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px]">
                <Link href="/" className="font-bold text-5xl tracking-tighter">
                    mindset
                </Link>
                <hr className="w-[60%] border border-white/10" />
                <div className="">
                    Створено для тих, кому є різниця у чому ходити. Для тих, у
                    кого його стиль - це його вайб.
                </div>
            </div>
            <div className="absolute top-[30px] left-[50%] translate-x-[-50%] rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px]">
                <div className="text-center font-bold mb-[5px]">Колекції:</div>
                <ul className="flex gap-[10px] max-w-[450px] flex-wrap justify-center">
                    {Array.isArray(collections) &&
                        collections.map((collection, i) => {
                            return (
                                <li key={i}>
                                    <ChooseLink
                                        href={`/${collection.path}`}
                                        onClick={() =>
                                            setCurrentCollection(collection)
                                        }
                                        currentCollection={currentCollection}
                                        collection={collection}
                                    >
                                        {collection.name}
                                    </ChooseLink>
                                </li>
                            );
                        })}
                </ul>
            </div>
            <div className="flex flex-col gap-[20px] ">
                <ul className="flex flex-col gap-[7px] text-sm rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px]">
                    <li className="hover:underline">
                        <a href="tel:+380974000000">+380 97 400 0000</a>
                    </li>
                    <li className="hover:underline">
                        <a href="mailto:mindset.support@gmail.com">
                            mindsetsupport@gmail.com
                        </a>
                    </li>
                    <li className="hover:underline">
                        <a
                            href="https://www.google.com/maps/place/%D0%9B%D1%83%D1%86%D1%8C%D0%BA,+%D0%92%D0%BE%D0%BB%D0%B8%D0%BD%D1%81%D1%8C%D0%BA%D0%B0+%D0%BE%D0%B1%D0%BB%D0%B0%D1%81%D1%82%D1%8C/"
                            target="_blank"
                        >
                            Україна, м. Луцьк
                        </a>
                    </li>
                </ul>
                <ul className="flex gap-[20px] justify-center rounded-xl bg-white/5 shadow-lg backdrop-blur-xl border border-white/5 p-[20px]">
                    <li>
                        <button className="cursor-pointer p-[10px] border border-white/10 rounded-[50%] hover:bg-white group transition-all duration-300">
                            <Link href={"#"}>
                                <TiktokIcon className="w-[20px] fill-white group-hover:fill-black" />
                            </Link>
                        </button>
                    </li>
                    <li>
                        <button className="cursor-pointer p-[10px] border border-white/10 rounded-[50%] hover:bg-white group transition-all duration-300">
                            <Link href={"#"}></Link>
                            <InstagramIcon className="w-[20px] fill-white group-hover:fill-black" />
                        </button>
                    </li>
                    <li>
                        <button className="cursor-pointer p-[10px] border border-white/10 rounded-[50%] hover:bg-white group transition-all duration-300">
                            <Link href={"#"}></Link>
                            <TelegramIcon className="w-[20px] fill-white group-hover:fill-black" />
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Footer;
