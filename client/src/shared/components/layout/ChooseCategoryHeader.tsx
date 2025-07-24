"use client";

import { useCollections } from "@/features/collections/hooks/useCollections";
import { ICollection } from "@/features/collections/types/collections.types";
import { BurgerMenuIcon, CloseIcon } from "@/shared/icons";
import Link from "next/link";
import { useEffect, useState } from "react";

const ChooseCategoryHeader = () => {
    const { data: collections, isError, error, isLoading } = useCollections();

    const [isOpen, setIsOpen] = useState(false);

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
        <div>
            <div
                className="cursor-pointer relative flex gap-[10px] rounded-xl bg-white/5 shadow-lg px-[20px] py-[13px] backdrop-blur-2xl border border-white/5 hover:bg-white/15 transition-all duration-300"
                onClick={() => setIsOpen(true)}
            >
                <BurgerMenuIcon className="w-[25px] fill-none stroke-2 stroke-white" />
            </div>

            <div
                className={`
                    absolute top-0 left-0 w-full h-screen bg-black transition-opacity duration-400 ease-in-out
                    ${
                        isOpen
                            ? "opacity-100 pointer-events-auto"
                            : "opacity-0 pointer-events-none"
                    }
                    z-50 flex flex-col justify-center text-white overflow-y-auto
                `}
            >
                <button
                    onClick={() => setIsOpen(false)}
                    className="cursor-pointer fixed top-[20px] left-[23px] p-2 rounded-xl hover:bg-white/10 transition-colors"
                >
                    <CloseIcon className="w-[30px] fill-none stroke-2 stroke-white" />
                </button>
                <div className="flex flex-col w-[53%] p-[30px] gap-[70px] overflow-y-auto">
                    <div className="flex gap-[20px] justify-between">
                        <div className="text-white relative px-[40px]">
                            <div className="text-6xl font-extrabold">
                                Наші колекції
                            </div>
                            <div className="absolute top-[40px] text-8xl font-qwitcher-grypen text-white/40">
                                Collections
                            </div>
                        </div>
                        <ul className="flex flex-col gap-4 text-2xl items-end">
                            {collections?.map((collection) => (
                                <li
                                    key={collection.id}
                                    onClick={() => setIsOpen(false)}
                                    className="border-b border-transparent hover:border-b hover:border-white transition-all duration-200"
                                >
                                    <Link href={`/${collection.path}`}>
                                        {collection.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex gap-[20px] justify-between">
                        <div className="text-white relative px-[40px]">
                            <div className="text-6xl font-extrabold">
                                Навігація
                            </div>
                            <div className="absolute top-[40px] text-8xl font-qwitcher-grypen text-white/40">
                                Navigation
                            </div>
                        </div>
                        <ul className="flex flex-col gap-4 text-2xl items-end">
                            <li
                                onClick={() => setIsOpen(false)}
                                className="border-b border-transparent hover:border-b hover:border-white transition-all duration-200"
                            >
                                <Link href={`/`}>Головна</Link>
                            </li>
                            <li
                                onClick={() => setIsOpen(false)}
                                className="border-b border-transparent hover:border-b hover:border-white transition-all duration-200"
                            >
                                <Link href={`/cart`}>Корзина</Link>
                            </li>
                            <li
                                onClick={() => setIsOpen(false)}
                                className="border-b border-transparent hover:border-b hover:border-white transition-all duration-200"
                            >
                                <Link href={`/favorites`}>
                                    Вподобані товари
                                </Link>
                            </li>
                            <li
                                onClick={() => setIsOpen(false)}
                                className="border-b border-transparent hover:border-b hover:border-white transition-all duration-200"
                            >
                                <Link href={`/account`}>Акаунт/вхід</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex gap-[20px] justify-between">
                        <div className="text-white relative px-[40px]">
                            <div className="text-6xl font-extrabold">
                                Інформація
                            </div>
                            <div className="absolute top-[40px] text-8xl font-qwitcher-grypen text-white/40">
                                Information
                            </div>
                        </div>
                        <ul className="flex flex-col gap-4 text-2xl items-end">
                            <li
                                onClick={() => setIsOpen(false)}
                                className="border-b border-transparent hover:border-b hover:border-white transition-all duration-200"
                            >
                                <Link href={`#`}>Наша політика</Link>
                            </li>
                            <li
                                onClick={() => setIsOpen(false)}
                                className="border-b border-transparent hover:border-b hover:border-white transition-all duration-200"
                            >
                                <Link href={`#`}>Про нас</Link>
                            </li>
                            <li
                                onClick={() => setIsOpen(false)}
                                className="border-b border-transparent hover:border-b hover:border-white transition-all duration-200"
                            >
                                <Link href={`#`}>FAQ</Link>
                            </li>
                            <li
                                onClick={() => setIsOpen(false)}
                                className="border-b border-transparent hover:border-b hover:border-white transition-all duration-200"
                            >
                                <Link href={`#`}>Контакти</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="flex gap-[20px] justify-between">
                        <div className="text-white relative px-[40px]">
                            <div className="text-6xl font-extrabold">
                                Соціальні мережі
                            </div>
                            <div className="absolute top-[40px] text-8xl font-qwitcher-grypen text-white/40">
                                Social media
                            </div>
                        </div>
                        <ul className="flex flex-col gap-4 text-2xl items-end">
                            <li
                                onClick={() => setIsOpen(false)}
                                className="border-b border-transparent hover:border-b hover:border-white transition-all duration-200"
                            >
                                <Link href={`#`}>Instagram</Link>
                            </li>
                            <li
                                onClick={() => setIsOpen(false)}
                                className="border-b border-transparent hover:border-b hover:border-white transition-all duration-200"
                            >
                                <Link href={`#`}>Telegram</Link>
                            </li>
                            <li
                                onClick={() => setIsOpen(false)}
                                className="border-b border-transparent hover:border-b hover:border-white transition-all duration-200"
                            >
                                <Link href={`#`}>Facebook</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChooseCategoryHeader;
