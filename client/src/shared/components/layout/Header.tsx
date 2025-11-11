"use client";

import { useCartItemsFromUser } from "@/features/shop/cart/hooks/useCart";
import { useFavoritesFromUser } from "@/features/shop/favorites/hooks/useFavorites";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { IUser } from "@/features/shop/user-info/types/user.types";
import { AccountIcon, CartIcon, HeartIcon } from "@/shared/icons";
import { useCartStore } from "@/store/useCartStore";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { HeaderBurger } from "./HeaderBurger";
export function Header({ serverUser }: { serverUser: IUser | null }) {
    const { data: user } = useCurrentUser();
    const { data: userFavorites } = useFavoritesFromUser();
    const { data: userCart } = useCartItemsFromUser();

    const [showTitle, setShowTitle] = useState(false);

    const pathname = usePathname();
    const { cartItems } = useCartStore();
    const { favoriteItems } = useFavoritesStore();

    useEffect(() => {
        const handleScroll = () => {
            if (pathname !== "/") {
                setShowTitle(true);
            } else if (
                // typeof window !== "undefined" &&
                window.scrollY > 390 &&
                pathname === "/"
            ) {
                setShowTitle(true);
            } else {
                setShowTitle(false);
            }
        };

        // if (typeof window !== "undefined") {
        window.addEventListener("scroll", handleScroll);
        handleScroll();
        // }

        return () => {
            // if (typeof window !== "undefined") {
            window.removeEventListener("scroll", handleScroll);
            // }
        };
    }, [pathname]);

    // Визначення, який список використовувати (серверний чи локальний)
    const cart = user ? userCart || [] : cartItems;
    const favorites = user ? userFavorites || [] : favoriteItems;

    return (
        <header className="fixed py-[10px] px-[30px] sm:px-[10px] sm:p-[10px] flex justify-between items-center w-full bg-black/70 backdrop-blur-xl text-white z-[100] shadow-custom">
            <HeaderBurger />
            <Link
                href="/"
                className={`absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
                    showTitle ? "opacity-100" : "opacity-0 pointer-events-none"
                }  px-[25px] py-[13px] pb-[18px] font-bold text-5xl md:text-4xl tracking-tighter leading-10 `}
            >
                mindset.
            </Link>

            <div className="flex items-center gap-[30px]">
                <ul className="flex gap-[10px]">
                    <li className="md:hidden">
                        <Link
                            href="/cart"
                            className="relative flex gap-[10px] rounded-xl bg-white/5 shadow-lg px-[20px] py-[13px] backdrop-blur-2xl border border-white/5 hover:bg-white/15 transition-all duration-300"
                        >
                            {Array.isArray(cart) && cart.length > 0 && (
                                <div className="absolute top-[5px] right-[7px] bg-black w-[20px] h-[20px] flex items-center justify-center text-[8px] font-bold rounded-[50%] border-2 border-white text-white">
                                    {cart.length}
                                </div>
                            )}
                            <CartIcon className="w-[25px] fill-none stroke-2 stroke-white" />
                        </Link>
                    </li>
                    <li className="md:hidden">
                        <Link
                            href="/favorites"
                            className="relative flex gap-[10px] rounded-xl bg-white/5 shadow-lg px-[20px] py-[13px] backdrop-blur-2xl border border-white/5 hover:bg-white/15 transition-all duration-300"
                        >
                            {Array.isArray(favorites) &&
                                favorites.length > 0 && (
                                    <div className="absolute top-[5px] right-[7px] bg-black w-[20px] h-[20px] flex items-center justify-center text-[8px] font-bold rounded-[50%] border-2 border-white text-white">
                                        {favorites.length}
                                    </div>
                                )}
                            <HeartIcon className="w-[25px] fill-none stroke-2 stroke-white" />
                        </Link>
                    </li>
                    <li className="sm:hidden">
                        {serverUser || user ? (
                            <Link
                                href="/account"
                                className="flex items-center gap-[10px] rounded-xl bg-white/5 shadow-lg px-[20px] py-[13px] backdrop-blur-2xl border border-white/5 hover:bg-white/15 transition-all duration-300"
                            >
                                <AccountIcon className="w-[25px] fill-white" />
                                <div>
                                    {serverUser?.userName || user?.userName}
                                </div>
                            </Link>
                        ) : (
                            <Link
                                href="/auth"
                                className="flex items-center gap-[10px] rounded-xl bg-white/5 shadow-lg px-[20px] py-[13px] backdrop-blur-xl border border-white/5 hover:bg-white/15 transition-all duration-300"
                            >
                                <AccountIcon className="w-[25px] fill-white" />
                                <div>Увійти</div>
                            </Link>
                        )}
                    </li>
                </ul>
            </div>
        </header>
    );
}
