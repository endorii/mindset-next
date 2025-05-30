"use client";

import AccountIcon from "@/components/Icons/AccountIcon";
import ArrowIcon from "@/components/Icons/ArrowIcon";
import CategoriesIcon from "@/components/Icons/CategoriesIcon";
import CollectionsIcon from "@/components/Icons/CollectionsIcon";
import LogoutIcon from "@/components/Icons/LogoutIcon";
import MainPageIcon from "@/components/Icons/MainPageIcon";
import ProductsIcon from "@/components/Icons/ProductsIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";
import Link from "next/link";
import { useState } from "react";

function AdminNavigation({ children }: { children: React.ReactNode }) {
    const [navOpen, setNavOpen] = useState(true);

    return (
        <div className="pt-[75px] flex h-[calc(100vh-75px)]">
            <div
                className={`relative flex flex-col justify-between border-r border-gray-200 transition-all duration-300 ease-in-out ${
                    navOpen ? "w-[300px]" : "w-[80px]"
                }`}
            >
                <button
                    className="absolute top-[10px] right-[20px] border border-transparent bg-black text-white p-[1px] hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200 group"
                    onClick={() => setNavOpen(!navOpen)}
                >
                    <ArrowIcon
                        className={`w-[25px] stroke-white fill-none group-hover:stroke-black transition-all duration-200 ${
                            navOpen ? "rotate-0" : "rotate-180"
                        }`}
                    />
                </button>
                <div
                    className={`flex flex-col gap-[25px] pt-[70px] transition-all duration-300 ${
                        navOpen ? "p-[30px] pr-[40px]" : "pr-[0px]"
                    }`}
                >
                    {[
                        { href: "/admin", Icon: MainPageIcon, text: "Головна" },
                        {
                            href: "/admin/collections",
                            Icon: CollectionsIcon,
                            text: "Колекції",
                        },
                        {
                            href: "/admin/categories",
                            Icon: CategoriesIcon,
                            text: "Категорії",
                        },
                        {
                            href: "/admin/products",
                            Icon: ProductsIcon,
                            text: "Товари",
                        },
                        {
                            href: "/admin/account",
                            Icon: AccountIcon,
                            text: "Акаунт",
                        },
                        {
                            href: "/admin/settings",
                            Icon: SettingsIcon,
                            text: "Налаштування",
                        },
                    ].map(({ href, Icon, text }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`flex gap-[18px] items-center font-semibold transition-all duration-300 ${
                                navOpen
                                    ? "px-[15px] pr-[30px]"
                                    : "px-[0px] justify-center"
                            }`}
                        >
                            <Icon className="w-[32px]" />
                            <span
                                className={`transition-opacity duration-200 ${
                                    navOpen
                                        ? "opacity-100"
                                        : "opacity-0 w-0 overflow-hidden"
                                }`}
                            >
                                {text}
                            </span>
                        </Link>
                    ))}
                </div>
                <Link
                    href="#"
                    className={`mb-[50px] flex gap-[20px] items-center font-semibold pb-[5px] transition-all duration-300 ${
                        navOpen ? "px-[47px] pr-[30px]" : "px-0 justify-center"
                    }`}
                >
                    <LogoutIcon className="w-[25px]" />
                    <span
                        className={`transition-opacity duration-200 ${
                            navOpen
                                ? "opacity-100"
                                : "opacity-0 w-0 overflow-hidden"
                        }`}
                    >
                        Вийти
                    </span>
                </Link>
            </div>
            <div className="p-[30px] flex-1">{children}</div>
        </div>
    );
}

export default AdminNavigation;
