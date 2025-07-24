"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { CartIcon, HeartIcon, AccountIcon } from "@/shared/icons";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { getLocalStorageArray } from "@/shared/utils/helpers";
import { useFavoritesFromUser } from "@/features/favorites/hooks/useFavorites";
import { useCartItemsFromUser } from "@/features/cart/hooks/useCart";
import { usePathname } from "next/navigation";
import ChooseCategoryHeader from "./ChooseCategoryHeader";
import { ICollection } from "@/features/collections/types/collections.types";

const Header = () => {
    const { data: user } = useCurrentUser();
    const { data: userFavorites } = useFavoritesFromUser(user?.id ?? "");
    const { data: userCart } = useCartItemsFromUser(user?.id ?? "");

    const [localCart, setLocalCart] = useState<any[]>([]);
    const [localFavorites, setLocalFavorites] = useState<any[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    const [showTitle, setShowTitle] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        setLocalCart(getLocalStorageArray("cart"));
        setLocalFavorites(getLocalStorageArray("favorites"));
    }, []);

    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            if (pathname !== "/") {
                setShowTitle(true);
            } else if (window.scrollY > 390 && pathname === "/") {
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

    const cart = !!userCart ? userCart : localCart;
    const favorites = !!userFavorites ? userFavorites : localFavorites;

    if (!isMounted) {
        return null;
    }

    return (
        <header className="fixed py-[10px] px-[20px] h-[85px] flex justify-between items-center w-full bg-black/70 backdrop-blur-xl text-white z-[100] shadow-custom">
            <ChooseCategoryHeader />
            <Link
                href="/"
                className={`absolute left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
                    showTitle ? "opacity-100" : "opacity-0 pointer-events-none"
                }  px-[25px] py-[13px] pb-[18px]  font-bold text-5xl tracking-tighter leading-10 `}
            >
                mindset.
            </Link>

            <div className="flex items-center gap-[30px]">
                <ul className="flex gap-[10px]">
                    <li>
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
                    <li>
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
                    <li>
                        {user ? (
                            <Link
                                href="/account"
                                className="flex gap-[10px] rounded-xl bg-white/5 shadow-lg px-[20px] py-[13px] backdrop-blur-2xl border border-white/5 hover:bg-white/15 transition-all duration-300"
                            >
                                <AccountIcon className="w-[25px] fill-white" />
                                <div>{user.name}</div>
                            </Link>
                        ) : (
                            <Link
                                href="/auth"
                                className="flex gap-[10px] rounded-xl bg-white/5 shadow-lg px-[20px] py-[13px] backdrop-blur-xl border border-white/5 hover:bg-white/15 transition-all duration-300"
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
};

export default Header;
