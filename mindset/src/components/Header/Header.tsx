import { user } from "@/data/user";
import Link from "next/link";
import CartIcon from "../Icons/CartIcon";
import AccountIcon from "../Icons/AccountIcon";
import HeartIcon from "../Icons/HeartIcon";
import SearchIcon from "../Icons/SearchIcon";

const Header = () => {
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
                            {user ? (
                                <div className="absolute top-[-10px] right-[-10px] bg-black w-[20px] h-[20px] flex items-center justify-center text-[8px] font-bold rounded-[50%] border-2 border-white text-white">
                                    {user?.cart.length}
                                </div>
                            ) : null}
                            <CartIcon className="w-[25px] fill-white stroke-black" />
                        </Link>
                    </li>
                    <li>
                        <Link href="/likes" className="relative">
                            {user ? (
                                <div className="absolute top-[-10px] right-[-10px] bg-black w-[20px] h-[20px] flex items-center justify-center text-[8px] font-bold rounded-[50%] border-2 border-white text-white">
                                    {user?.favorites.length}
                                </div>
                            ) : null}
                            <HeartIcon className="w-[25px] fill-white stroke-black" />
                        </Link>
                    </li>
                    <li>
                        <Link href="/account">
                            <AccountIcon className="w-[25px] fill-black" />
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default Header;
