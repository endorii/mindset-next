import AccountIcon from "@/components/Icons/AccountIcon";
import SearchIcon from "@/components/Icons/SearchIcon";
import Link from "next/link";
import React from "react";

function AdminHeader() {
    return (
        <header className="fixed top-0 py-[10px] px-[20px] md:px-[35px] h-[65px] md:h-[75px] flex gap-[5%] items-center w-full bg-white z-[100] shadow-custom border-b border-gray-200 ">
            <div className="min-w-[180px]">
                <Link
                    href="/admin"
                    className="font-bold text-4xl tracking-tighter"
                >
                    mind panel
                </Link>
            </div>

            <div className="w-full flex items-center gap-[30px] justify-between">
                <div className="relative">
                    <SearchIcon className="absolute top-[5px] right-0 w-[20px] fill-white stroke-black" />
                    <input
                        type="text"
                        className="border-b text-xs py-2 outline-0 w-[230px] pr-[25px]"
                        placeholder="пошук по панелі"
                    />
                </div>

                <div className="flex gap-[30px]">
                    <div>
                        <Link
                            href="/account"
                            className="flex gap-[10px] items-center"
                        >
                            <AccountIcon className="w-[25px] fill-black" />
                            admintest@gmail.com
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
