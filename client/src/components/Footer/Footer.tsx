"use client";

import Link from "next/link";
import TiktokIcon from "../Icons/TiktokIcon";
import InstagramIcon from "../Icons/InstagramIcon";
import TelegramIcon from "../Icons/TelegramIcon";
import { useCollections } from "@/lib/hooks/useCollections";

const Footer = () => {
    const { data: collections, isError, error, isLoading } = useCollections();

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
        <div className="relative bg-black p-[50px] flex justify-between text-white">
            <div className="flex flex-col gap-[25px] w-[350px] text-sm">
                <Link href="/" className="font-bold text-5xl tracking-tighter">
                    mindset
                </Link>
                <hr className="w-[60%]" />
                <div className="">
                    Створено для тих, кому є різниця у чому ходити. Для тих, у
                    кого його стиль - це його вайб.
                </div>
            </div>
            <div className="absolute top-[50px] left-[50%] translate-x-[-50%]">
                <div className="text-center font-bold mb-[5px]">Колекції:</div>
                <ul className="flex gap-[10px] ">
                    {collections?.map((collection, i) => {
                        return (
                            <li
                                key={i}
                                className="border border-gray-300 hover:bg-white hover:text-black transition-colors duration-300 mt-[10px]"
                            >
                                <Link
                                    href={collection.path}
                                    className="flex items-center justify-center cursor-pointer px-4 py-2"
                                >
                                    {collection.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div className="flex flex-col gap-[20px]">
                <ul className="flex flex-col gap-[7px]">
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
                <ul className="flex gap-[20px]">
                    <li>
                        <button className="cursor-pointer p-[10px] border borer-white rounded-[50%] hover:bg-white group transition-all duration-300">
                            <Link href={"#"}>
                                <TiktokIcon className="w-[20px] fill-white group-hover:fill-black" />
                            </Link>
                        </button>
                    </li>
                    <li>
                        <button className="cursor-pointer p-[10px] border borer-white rounded-[50%] hover:bg-white group transition-all duration-300">
                            <Link href={"#"}></Link>
                            <InstagramIcon className="w-[20px] fill-white group-hover:fill-black" />
                        </button>
                    </li>
                    <li>
                        <button className="cursor-pointer p-[10px] border borer-white rounded-[50%] hover:bg-white group transition-all duration-300">
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
