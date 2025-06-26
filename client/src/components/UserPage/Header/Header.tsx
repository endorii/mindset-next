"use client";
import Link from "next/link";
import CartIcon from "../../Icons/CartIcon";
import AccountIcon from "../../Icons/AccountIcon";
import HeartIcon from "../../Icons/HeartIcon";
import SearchIcon from "../../Icons/SearchIcon";
import { useCurrentUser } from "@/lib/hooks/useUsers";

const Header = () => {
    const { data: user } = useCurrentUser();

    return (
        <header className="fixed top-0 py-[10px] px-[20px] md:px-[35px] h-[75px] md:h-[85px] flex justify-end items-center w-full bg-white z-[100] shadow-custom border-b border-gray-200">
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link href="/" className="font-bold text-5xl tracking-tighter">
                    mindset
                </Link>
            </div>

            <div className="flex items-center gap-[30px]">
                <div className="relative">
                    <SearchIcon className="absolute top-[5px] right-0 w-[20px] fill-white stroke-black" />
                    <input
                        type="text"
                        className="border-b text-xs py-2 outline-0 w-[200px] pr-[25px]"
                        placeholder="знайти щось"
                    />
                </div>

                <ul className="flex gap-[30px]">
                    <li>
                        <Link href="/cart" className="relative">
                            {Array.isArray(user?.cart) && (
                                <div className="absolute top-[-10px] right-[-10px] bg-black w-[20px] h-[20px] flex items-center justify-center text-[8px] font-bold rounded-[50%] border-2 border-white text-white">
                                    {user.cart.length}
                                </div>
                            )}
                            <CartIcon className="w-[25px] fill-white stroke-2 stroke-black" />
                        </Link>
                    </li>
                    <li>
                        <Link href="/likes" className="relative">
                            {Array.isArray(user?.favorites) && (
                                <div className="absolute top-[-10px] right-[-10px] bg-black w-[20px] h-[20px] flex items-center justify-center text-[8px] font-bold rounded-[50%] border-2 border-white text-white">
                                    {user.favorites.length}
                                </div>
                            )}
                            <HeartIcon className="w-[25px] fill-white stroke-2 stroke-black" />
                        </Link>
                    </li>
                    <li>
                        {user ? (
                            <Link
                                href="/account"
                                className="flex items-center gap-[10px] font-semibold"
                            >
                                <AccountIcon className="w-[25px] fill-black" />
                                <div>{user.name}</div>
                            </Link>
                        ) : (
                            <Link
                                href="/login"
                                className="flex items-center gap-[5px] font-semibold"
                            >
                                <AccountIcon className="w-[25px] fill-black" />
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
