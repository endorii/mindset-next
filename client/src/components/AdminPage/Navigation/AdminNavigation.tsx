"use client";

import AccountIcon from "@/components/Icons/AccountIcon";
import BackIcon from "@/components/Icons/BackIcon";
import CollectionsIcon from "@/components/Icons/CollectionsIcon";
import LogoutIcon from "@/components/Icons/LogoutIcon";
import MainPageIcon from "@/components/Icons/MainPageIcon";
import SettingsIcon from "@/components/Icons/SettingsIcon";
import StatsIcon from "@/components/Icons/StatsIcon";
import TagIcon from "@/components/Icons/TagIcon";
import Link from "next/link";
import { useState } from "react";

function AdminNavigation({ children }: { children: React.ReactNode }) {
    const [navOpen, setNavOpen] = useState(true);

    const links = [
        { href: "/admin", Icon: MainPageIcon, text: "Головна" },
        {
            href: "/admin/collections",
            Icon: CollectionsIcon,
            text: "Колекції",
        },
        {
            href: "/admin/attributes",
            Icon: TagIcon,
            text: "Атрибути",
        },
        {
            href: "/admin/stats",
            Icon: StatsIcon,
            text: "Статистика",
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
    ];

    return (
        <div className="fixed pt-[90px] flex h-screen w-full z-[5] text-white">
            <div
                className={`relative flex flex-col gap-[15px] transition-all duration-300 ease-in-out ${
                    navOpen ? "w-[300px]" : "w-[100px]"
                }`}
                onMouseEnter={() => {
                    setNavOpen(true);
                }}
                onMouseLeave={() => {
                    setNavOpen(false);
                }}
            >
                <button
                    className="absolute top-[8px] right-0 flex gap-[15px] items-center cursor-pointer p-[7px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300"
                    onClick={() => setNavOpen(!navOpen)}
                >
                    <BackIcon
                        className={`w-[18px] stroke-white stroke-[50] fill-white group-hover:stroke-black transition-all duration-200 ${
                            navOpen ? "rotate-0" : "rotate-180"
                        }`}
                    />
                </button>
                <div
                    className={`flex flex-col gap-[15px] mt-[50px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]`}
                >
                    {links.map(({ href, Icon, text }) => (
                        <Link
                            key={href}
                            href={href}
                            className={`flex gap-[15px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 ${
                                navOpen ? "px-[25px]" : "px-[10px]"
                            }`}
                        >
                            <div
                                className={`flex items-center justify-center gap-[20px] w-full ${
                                    navOpen ? "justify-start" : "justify-center"
                                }`}
                            >
                                <Icon className="w-[32px] h-[32px] min-w-[32px] min-h-[32px] fill-white group-hover:fill-black " />

                                <span
                                    className={`group-hover:text-black transition-all duration-200 ${
                                        navOpen
                                            ? "opacity-100"
                                            : "opacity-0 hidden"
                                    }`}
                                >
                                    {text}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>

                <div
                    className={`flex flex-col gap-[20px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] ${
                        navOpen ? "justify-start" : "justify-center"
                    }`}
                >
                    <Link
                        href="/"
                        className={`flex gap-[15px] py-[13px] w-full items-center cursor-pointer  border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 ${
                            navOpen ? "px-[25px]" : "px-[5px]"
                        }`}
                    >
                        <div
                            className={`flex items-center gap-[20px] w-full ${
                                navOpen ? "justify-start" : "justify-center"
                            }`}
                        >
                            <LogoutIcon className="w-[25px] h-[25px] min-w-[25px] min-h-[25px] fill-white group-hover:fill-black" />
                            <span
                                className={`group-hover:text-black transition-all duration-200 whitespace-nowrap ${
                                    navOpen ? "opacity-100" : "opacity-0 hidden"
                                }`}
                            >
                                Вийти з панелі
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
            <div className="p-[30px] flex-1 overflow-y-auto">{children}</div>
        </div>
    );
}

export default AdminNavigation;
