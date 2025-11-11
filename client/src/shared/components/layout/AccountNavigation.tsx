"use client";

import { useLogoutUser } from "@/features/auth/hooks/useAuth";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { AdminIcon, BackIcon, LogoutIcon } from "@/shared/icons";
import { NavigationLink } from "@/shared/ui/buttons";
import { ButtonSkeleton } from "@/shared/ui/skeletons";
import { accountNavigationLinks } from "@/shared/utils/accountNavigationLinks";
import { useState } from "react";

export function AccountNavigation({ children }: { children: React.ReactNode }) {
    const { data: user, isPending: isUserPending } = useCurrentUser();
    const logoutUserMutation = useLogoutUser();

    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <div className="relative flex gap-[15px] p-[30px] pt-[10px] sm:p-[10px] text-white">
            <button
                className="hidden md:flex top-[75px] fixed w-[40px] h-[40px] items-center justify-center cursor-pointer z-2 bg-white/5 rounded-xl border border-white/10 shadow-lg backdrop-blur-[100px]"
                onClick={() => setIsOpen(!isOpen)}
            >
                <BackIcon
                    className={`w-[18px] stroke-white stroke-[50] fill-white group-hover:stroke-black transition-all duration-200 ${
                        isOpen ? "rotate-0" : "rotate-180"
                    }`}
                />
            </button>
            <div
                className={`md:fixed md:top-[125px] overflow-y-auto max-h-screen-minus-header w-full max-w-[300px] ${
                    isOpen ? "left-[10px]" : "left-[-350px]"
                } flex flex-col justify-between gap-[100px] md:gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] z-1 transition-all duration-600 ease-in-out`}
            >
                <div className="flex gap-[30px] flex-col">
                    <div className={`flex flex-col gap-[13px]`}>
                        {accountNavigationLinks.map(
                            ({ href, Icon, text, className }) => (
                                <NavigationLink
                                    key={href}
                                    href={href}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Icon className={className} />

                                    <span
                                        className={`transition-opacity duration-200 group-hover:text-black`}
                                    >
                                        {text}
                                    </span>
                                </NavigationLink>
                            )
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-[15px]">
                    {user?.role === "ADMIN" ? (
                        <div>
                            <NavigationLink href="/admin">
                                <AdminIcon className="w-[25px] fill-white group-hover:fill-black" />
                                <span className="transition-opacity duration-200 group-hover:text-black">
                                    Адмін панель
                                </span>
                            </NavigationLink>
                        </div>
                    ) : isUserPending ? (
                        <ButtonSkeleton />
                    ) : null}

                    <button
                        onClick={async () => {
                            await logoutUserMutation.mutateAsync();
                        }}
                        disabled={logoutUserMutation.isPending}
                        className="flex gap-[15px] py-[13px] items-center cursor-pointer bg-black/40 px-[20px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 "
                    >
                        <LogoutIcon className="w-[25px] fill-white group-hover:fill-black" />
                        <span className="transition-opacity duration-200 group-hover:text-black">
                            {logoutUserMutation.isPending
                                ? "Виходимо..."
                                : "Вийти з акаунту"}
                        </span>
                    </button>
                </div>
            </div>
            <div className="w-full md:mt-[30px] lg:mt-0">{children}</div>
        </div>
    );
}
