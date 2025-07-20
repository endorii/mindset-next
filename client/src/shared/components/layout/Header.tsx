"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { CartIcon, HeartIcon, AccountIcon } from "@/shared/icons";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { getLocalStorageArray } from "@/shared/utils/helpers";
import { useFavoritesFromUser } from "@/features/favorites/hooks/useFavorites";
import { useCartItemsFromUser } from "@/features/cart/hooks/useCart";

const Header = () => {
    const { data: user } = useCurrentUser();
    const { data: userFavorites } = useFavoritesFromUser(user?.id ?? "");
    const { data: userCart } = useCartItemsFromUser(user?.id ?? "");

    const [localCart, setLocalCart] = useState<any[]>([]);
    const [localFavorites, setLocalFavorites] = useState<any[]>([]);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        setLocalCart(getLocalStorageArray("cart"));
        setLocalFavorites(getLocalStorageArray("favorites"));
    }, []);

    const cart = !!userCart ? userCart : localCart;

    const favorites = !!userFavorites ? userFavorites : localFavorites;

    if (!isMounted) {
        return null;
    }

    return (
        <header className="fixed top-[10px] py-[10px] px-[20px] md:px-[35px] h-[75px] md:h-[85px] flex justify-end items-center w-full bg-transparent text-white z-[100] shadow-custom ">
            <Link
                href="/"
                className="absolute left-1/2 transform -translate-x-1/2 rounded-xl bg-white/5 shadow-lg px-[25px] py-[13px] pb-[18px] backdrop-blur-2xl font-bold text-5xl tracking-tighter leading-10 border border-white/5"
            >
                mindset
            </Link>

            <div className="flex items-center gap-[30px]">
                {/* <div className="relative">
                    <SearchIcon className="absolute top-[5px] right-0 w-[20px] fill-white stroke-black" />
                    <input
                        type="text"
                        className="border-b text-xs py-2 outline-0 w-[200px] pr-[25px]"
                        placeholder="знайти щось"
                    />
                </div> */}

                <ul className="flex gap-[10px]">
                    <li>
                        <Link
                            href="/cart"
                            className="relative flex gap-[10px] rounded-xl bg-white/5 shadow-lg px-[20px] py-[13px] backdrop-blur-2xl border border-white/5"
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
                            className="relative flex gap-[10px] rounded-xl bg-white/5 shadow-lg px-[20px] py-[13px] backdrop-blur-2xl border border-white/5"
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
                                className="relative flex gap-[10px] rounded-xl bg-white/5 shadow-lg px-[20px] py-[13px] backdrop-blur-2xl border border-white/5"
                            >
                                <AccountIcon className="w-[25px] fill-white" />
                                <div>{user.name}</div>
                            </Link>
                        ) : (
                            <Link
                                href="/auth"
                                className="relative flex gap-[10px] rounded-xl bg-white/5 shadow-lg px-[20px] py-[13px] backdrop-blur-2xl border border-white/5"
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
