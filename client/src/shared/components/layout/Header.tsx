"use client";

import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { IUser } from "@/features/shop/user-info/types/user.types";
import { UserIcon } from "@/shared/icons";
import { useCartStore } from "@/store/useCartStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HeaderBurger } from "./HeaderBurger";

export function Header({ serverUser }: { serverUser: IUser | null }) {
    const { data: user } = useCurrentUser();
    const pathname = usePathname();

    const { cartItems } = useCartStore();

    const [showTitle, setShowTitle] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (pathname !== "/") {
                setShowTitle(true);
            } else if (window.scrollY > 400 && pathname === "/") {
                setShowTitle(true);
            } else {
                setShowTitle(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [pathname]);

    const cartAmount = user ? user.cart?.length ?? 0 : cartItems.length;

    return (
        <header
            className={`fixed py-[20px] px-[30px] sm:px-[10px] sm:py-[20px] flex justify-between items-center w-full text-white z-[100] transition-all duration-300
        ${
            pathname === "/"
                ? showTitle
                    ? "backdrop-blur-md bg-black/70"
                    : "bg-transparent"
                : "backdrop-blur-xl bg-black/70"
        }
    `}
        >
            <HeaderBurger />
            <Link
                href="/"
                className={`absolute left-1/2 font-perandory tracking-wide transform -translate-x-1/2 transition-opacity duration-300 ${
                    showTitle ? "opacity-100" : "opacity-0 pointer-events-none"
                }  px-[25px] py-[10px] font-bold text-5xl md:text-4xl`}
            >
                mindset
            </Link>

            <ul className="flex gap-[30px]">
                <li className="md:hidden">
                    <Link
                        href="/cart"
                        className="flex items-start gap-[10px] font-perandory tracking-wider text-[20px] border-b border-transparent hover:border-white transition-all duration-200"
                    >
                        <div>
                            cart
                            {cartAmount > 0 && `(${cartAmount})`}
                        </div>
                    </Link>
                </li>
                <li className="md:hidden">
                    <Link
                        href="/favorites"
                        className="flex font-perandory tracking-wider text-[20px] border-b border-transparent hover:border-white transition-all duration-200"
                    >
                        favorites
                    </Link>
                </li>
                <li className="sm:hidden">
                    <Link
                        href={` ${serverUser || user ? "/account" : "/auth"}`}
                        className="flex items-start gap-[10px] font-perandory tracking-wider text-[20px] border-b border-transparent hover:border-white transition-all duration-200"
                    >
                        <UserIcon className="w-[25px] fill-white" />
                        <div>
                            {serverUser?.userName || user?.userName
                                ? serverUser?.userName || user?.userName
                                : "Login"}
                        </div>
                    </Link>
                </li>
            </ul>
        </header>
    );
}
