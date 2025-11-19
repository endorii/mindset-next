"use client";

import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { SearchIcon, UserIcon } from "@/shared/icons";
import Link from "next/link";

export function AdminHeader() {
    const { data: user, isPending: isUserPending } = useCurrentUser();

    return (
        <header className="fixed top-0 py-[10px] px-[30px] sm:px-[10px] h-[80px] flex gap-[10px] items-center w-full shadow-custom bg-transparent border-b border-white/10 z-10">
            <div className="w-full">
                <Link
                    href={"/admin"}
                    className="text-white text-4xl font-perandory tracking-wider border-b"
                >
                    mind panel
                </Link>
            </div>

            <div className="w-full flex items-center gap-[30px] justify-end">
                <button className="group">
                    <SearchIcon className="w-[24px] fill-none stroke-white/20 stroke-2 group-hover:stroke-white transition-all duration-300" />
                </button>

                <Link
                    href="/admin/account"
                    className="xs:hidden flex items-center text-white"
                >
                    <div className="flex items-center gap-[10px] border-b border-transparent hover:border-b-white transition-all duration-200">
                        <UserIcon className="w-[25px] fill-white" />
                        <div className="mt-[3px] font-perandory tracking-wider text-xl">
                            {user ? (
                                user.userName
                            ) : isUserPending ? (
                                <div className="h-[24px] w-[100px] animate-pulse"></div>
                            ) : (
                                "Not logged in"
                            )}
                        </div>
                    </div>
                </Link>
            </div>
        </header>
    );
}
