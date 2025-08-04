"use client";

import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { useAuth } from "@/features/auth/hooks/useAuth";
import {
    MainPageIcon,
    CollectionsIcon,
    CartIcon,
    HeartIcon,
    AdminIcon,
    LogoutIcon,
    BackIcon,
} from "@/shared/icons";
import { NavigationLink } from "@/shared/ui/buttons";
import { useState } from "react";
import { toast } from "sonner";

function AccountNavigation({ children }: { children: React.ReactNode }) {
    const { data: user } = useCurrentUser();
    const { logout } = useAuth();

    const [isOpen, setIsOpen] = useState<boolean>(true);

    const links = [
        {
            href: "/account",
            Icon: MainPageIcon,
            text: "Інформація",
            className: "w-[32px] fill-white group-hover:fill-black",
        },

        {
            href: "/account/orders",
            Icon: CollectionsIcon,
            text: "Замовлення",
            className: "w-[32px] fill-white group-hover:fill-black",
        },
        {
            href: "/cart",
            Icon: CartIcon,
            text: "Кошик",
            className:
                "w-[32px] stroke-white fill-none group-hover:stroke-black",
        },
        {
            href: "/favorites",
            Icon: HeartIcon,
            text: "Улюблене",
            className:
                "w-[32px] stroke-white fill-none group-hover:stroke-black",
        },
    ];

    return (
        <div className="relative flex gap-[20px] p-[30px] sm:p-[10px] text-white">
            <button
                className="hidden sm:flex top-[90px] fixed w-[40px] h-[40px] items-center justify-center cursor-pointer z-2 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-[100px]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <BackIcon
                    className={`w-[18px] stroke-white stroke-[50] fill-white group-hover:stroke-black transition-all duration-200 ${
                        isOpen ? "rotate-0" : "rotate-180"
                    }`}
                />
            </button>
            <div
                className={`sm:fixed sm:top-[135px] border-r h-fit w-full max-w-[350px] ${
                    isOpen ? "left-[10px]" : "left-[-350px]"
                } flex flex-col justify-between gap-[100px] sm:gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] z-1 transition-all duration-600 ease-in-out`}
            >
                <div className="flex gap-[30px] flex-col">
                    <div className="flex gap-[30px] items-center">
                        <img
                            src="./images/user.png"
                            alt="user image"
                            className="w-[100px] lg:w-[70px] rounded-full border-2 border-white/5"
                        />
                        <div className="flex flex-col gap-[2px]">
                            <div className="text-2xl font-thin">
                                {user?.name}
                            </div>
                            <div className="text-white/40 text-xs font-light">
                                {user?.phone}
                            </div>
                            <div className="text-white/40 text-xs font-light">
                                {user?.email}
                            </div>
                        </div>
                    </div>
                    <hr className="border-t border-white/10" />
                    <div className={`flex flex-col gap-[13px]`}>
                        {links.map(({ href, Icon, text, className }) => (
                            <NavigationLink key={href} href={href}>
                                <Icon className={className} />

                                <span
                                    className={`transition-opacity duration-200 group-hover:text-black`}
                                >
                                    {text}
                                </span>
                            </NavigationLink>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-[15px]">
                    {user?.role === "ADMIN" ? (
                        <div>
                            <NavigationLink href="/admin">
                                <AdminIcon className="w-[25px] fill-white group-hover:fill-black" />
                                <span className="transition-opacity duration-200 group-hover:text-black">
                                    Адмін панель
                                </span>
                            </NavigationLink>
                        </div>
                    ) : null}
                    <div>
                        <NavigationLink
                            href="#"
                            onClick={async () => {
                                await logout();
                                toast.success("Ви вийшли з Вашого акаунту");
                            }}
                        >
                            <LogoutIcon className="w-[25px] fill-white group-hover:fill-black" />
                            <span className="transition-opacity duration-200 group-hover:text-black">
                                Вийти з акаунту
                            </span>
                        </NavigationLink>
                    </div>
                </div>
            </div>
            <div className="w-full sm:mt-[40px]">{children}</div>
        </div>
    );
}

export default AccountNavigation;
