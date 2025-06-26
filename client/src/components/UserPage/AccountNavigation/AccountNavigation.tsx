"use client";

import CartIcon from "@/components/Icons/CartIcon";
import CollectionsIcon from "@/components/Icons/CollectionsIcon";
import HeartIcon from "@/components/Icons/HeartIcon";
import LogoutIcon from "@/components/Icons/LogoutIcon";
import MainPageIcon from "@/components/Icons/MainPageIcon";
import { useAuth } from "@/lib/hooks/useAuth";
import { useCurrentUser } from "@/lib/hooks/useUsers";
import Link from "next/link";

function AccountNavigation({ children }: { children: React.ReactNode }) {
    const { data: user } = useCurrentUser();
    const { logout } = useAuth();

    const links = [
        {
            href: "/account",
            Icon: MainPageIcon,
            text: "Інформація",
            className: "w-[32px] group-hover:fill-white",
        },

        {
            href: "/account/orders",
            Icon: CollectionsIcon,
            text: "Замовлення",
            className: "w-[32px] group-hover:fill-white",
        },
        {
            href: "/cart",
            Icon: CartIcon,
            text: "Кошик",
            className:
                "w-[32px] group-hover:stroke-white fill-none stroke stroke-[1.5] stroke-black ",
        },
        {
            href: "/likes",
            Icon: HeartIcon,
            text: "Улюблене",
            className:
                "w-[32px] group-hover:stroke-white stroke stroke-[1.5] stroke-black fill-none",
        },
    ];

    return (
        <div className="flex gap-[20px] min-h-[63vh]">
            <div className=" border-r border-gray-200 min-h-full w-full max-w-[450px] p-[20px] flex flex-col justify-between gap-[100px]">
                <div className="flex gap-[30px] flex-col">
                    <div className="flex gap-[30px] items-center">
                        <img
                            src="./images/user.png"
                            alt="user image"
                            className="w-[100px] rounded-full"
                        />
                        <div className="flex flex-col gap-[2px]">
                            <div className="font-semibold text-lg">
                                {user?.name}
                            </div>
                            <div className="text-gray-500 text-xs">
                                {user?.phone}
                            </div>
                            <div className="text-gray-500 text-xs">
                                {user?.email}
                            </div>
                        </div>
                    </div>
                    <hr className="border-gray-200 border-dashed" />
                    <div className={`flex flex-col gap-[13px]`}>
                        {links.map(({ href, Icon, text, className }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`flex gap-[15px] items-center font-semibold group px-[10px] py-[7px] hover:bg-black hover:text-white transition-all duration-300 rounded `}
                            >
                                <Icon className={className} />

                                <span
                                    className={`transition-opacity duration-200 `}
                                >
                                    {text}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="">
                    <Link
                        href="#"
                        className={`flex gap-[15px] items-center font-semibold group px-[10px] py-[7px] hover:bg-black hover:text-white transition-all duration-300 rounded `}
                        onClick={() => logout()}
                    >
                        <LogoutIcon className="w-[25px] group-hover:fill-white" />
                        <span className={`transition-opacity duration-200 `}>
                            Вийти
                        </span>
                    </Link>
                </div>
            </div>
            <div className="p-[20px] w-full">{children}</div>
        </div>
    );
}

export default AccountNavigation;
