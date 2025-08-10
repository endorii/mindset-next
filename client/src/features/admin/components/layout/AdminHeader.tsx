"use client";

import { SearchIcon, AccountIcon } from "@/shared/icons";
import Link from "next/link";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";

function AdminHeader() {
    const { data: user } = useCurrentUser();

    return (
        <header className="fixed top-0 py-[10px] px-[30px] sm:px-[10px] h-[80px] flex gap-[5%] items-center w-full shadow-custom bg-transparent border-b border-white/10 z-[10]">
            <Link
                href={"/admin"}
                className="min-w-[220px] rounded-xl bg-white/5 shadow-lg px-[25px] py-[5px] pb-[10px] backdrop-blur-2xl border border-white/5 text-white font-bold text-4xl tracking-tighter"
            >
                mind panel
            </Link>

            <div className="w-full flex items-center gap-[10px] justify-end">
                <div className="group rounded-xl bg-white/5 shadow-lg p-[17px] backdrop-blur-2xl border border-white/5 text-white cursor-pointer">
                    <SearchIcon className="w-[24px] fill-none stroke-white/20 stroke-2 group-hover:stroke-white transition-all duration-300" />
                </div>

                <Link
                    href="/admin/account"
                    className="xs:hidden flex items-center gap-[30px] rounded-xl bg-white/5 shadow-lg px-[20px] py-[13px] pb-[18px] backdrop-blur-2xl border border-white/5 text-white hover:bg-white/12 hover:border-white/7"
                >
                    <div className="flex items-center gap-[10px]">
                        <AccountIcon className="w-[25px] fill-white" />
                        <div className="mt-[3px]">
                            {user ? user.name : "Не авторизовано"}
                        </div>
                    </div>
                </Link>
            </div>
        </header>
    );
}

export default AdminHeader;
