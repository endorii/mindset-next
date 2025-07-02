"use client";

import { useAuth } from "@/features/auth/hooks/useAuth";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import {
    AdminIcon,
    CartIcon,
    CollectionsIcon,
    HeartIcon,
    LogoutIcon,
    MainPageIcon,
} from "@/shared/icons";
import Link from "next/link";

function AccountNavigation({ children }: { children: React.ReactNode }) {
    const { data: user } = useCurrentUser();
    const { logout } = useAuth();

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
            href: "/likes",
            Icon: HeartIcon,
            text: "Улюблене",
            className:
                "w-[32px] stroke-white fill-none group-hover:stroke-black",
        },
    ];

    return (
        <div className="flex gap-[20px] min-h-[63vh] p-[10px] py-[50px] text-white">
            <div className=" border-r min-h-full w-full max-w-[450px] flex flex-col justify-between gap-[100px] rounded-xl bg-gradient-to-br from-white/10 to-white/3 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="flex gap-[30px] flex-col">
                    <div className="flex gap-[30px] items-center">
                        <img
                            src="./images/user.png"
                            alt="user image"
                            className="w-[100px] rounded-full border-2 border-white/5"
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
                            <Link
                                key={href}
                                href={href}
                                className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300"
                            >
                                <Icon className={className} />

                                <span
                                    className={`transition-opacity duration-200 group-hover:text-black`}
                                >
                                    {text}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-[15px]">
                    {user?.role === "ADMIN" ? (
                        <div>
                            <Link
                                href="/admin"
                                className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300"
                            >
                                <AdminIcon className="w-[25px] fill-white group-hover:fill-black" />
                                <span className="transition-opacity duration-200 group-hover:text-black">
                                    Адмін панель
                                </span>
                            </Link>
                        </div>
                    ) : null}
                    <div>
                        <Link
                            href="#"
                            className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300"
                            onClick={() => logout()}
                        >
                            <LogoutIcon className="w-[25px] fill-white group-hover:fill-black" />
                            <span className="transition-opacity duration-200 group-hover:text-black">
                                Вийти
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="w-full">{children}</div>
        </div>
    );
}

export default AccountNavigation;
