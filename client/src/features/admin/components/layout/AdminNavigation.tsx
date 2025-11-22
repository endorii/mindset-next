"use client";

import { BackIcon, LogoutIcon } from "@/shared/icons";
import { AdminNavigationLink } from "@/shared/ui/buttons";
import { NavigationHideTextWrapper } from "@/shared/ui/wrappers";
import { useState } from "react";
import { toast } from "sonner";
import { adminPanelNavigationLinks } from "../../utils/navigationLinks";

export function AdminNavigation({ children }: { children: React.ReactNode }) {
    const [navOpen, setNavOpen] = useState(false);

    return (
        <div className="fixed pt-[90px] flex h-screen w-full z-[5] text-white">
            <button
                className="absolute top-[83px] left-[10px] flex gap-[15px] shadow-lg backdrop-blur-[100px] items-center cursor-pointer p-[7px] border border-white/5 hover:bg-white group transition-all duration-300 z-10"
                onClick={() => setNavOpen(!navOpen)}
            >
                <BackIcon
                    className={`w-[18px] stroke-white stroke-[50] fill-white group-hover:stroke-black transition-all duration-200 ${
                        navOpen ? "rotate-0" : "rotate-180"
                    }`}
                />
            </button>
            <div
                className={`sm:absolute relative flex max-h-screen-minus-header overflow-y-auto flex-col gap-[15px] transition-all duration-500 ease-in-out ml-[10px] mt-[30px] z-10 ${
                    navOpen
                        ? "w-[250px] sm:left-[0px]"
                        : "w-[90px] sm:left-[-320px]"
                }`}
            >
                <div
                    className={`flex flex-col gap-[10px] bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[15px]`}
                >
                    {adminPanelNavigationLinks.map(({ href, Icon, text }) => (
                        <AdminNavigationLink
                            href={href}
                            navOpen={navOpen}
                            key={text}
                            onClick={() => setNavOpen(false)}
                        >
                            <Icon className="w-[30px] h-[30px] min-w-[30px] min-h-[30px] fill-white group-hover:fill-black " />
                            <NavigationHideTextWrapper navOpen={navOpen}>
                                {text}
                            </NavigationHideTextWrapper>
                        </AdminNavigationLink>
                    ))}
                </div>

                <div
                    className={`flex flex-col gap-[10px] bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[15px] ${
                        navOpen ? "justify-start" : "justify-center"
                    }`}
                >
                    <div
                        onClick={() =>
                            toast.success(
                                "You have successfully logged out of the admin panel."
                            )
                        }
                    >
                        <AdminNavigationLink
                            href={"/account"}
                            navOpen={navOpen}
                        >
                            <LogoutIcon className="w-[25px] h-[25px] min-w-[25px] min-h-[25px] fill-white group-hover:fill-black" />
                            <NavigationHideTextWrapper navOpen={navOpen}>
                                Exit the panel
                            </NavigationHideTextWrapper>
                        </AdminNavigationLink>
                    </div>
                </div>
            </div>
            <div
                className="p-[20px] pt-[30px] sm:p-[10px] sm:pt-[30px] flex-1 overflow-y-auto"
                onClick={() => setNavOpen(false)}
            >
                {children}
            </div>
        </div>
    );
}
