"use client";

import { BackIcon, LogoutIcon } from "@/shared/icons";
import NavigationHideTextWrapper from "@/shared/ui/wrappers/NavigationHideTextWrapper";
import { useState } from "react";
import { adminPanelNavigationLinks } from "../../utils/navigationLinks";
import AdminNavigationLink from "@/shared/ui/buttons/AdminNavigationLink";
import { toast } from "sonner";

function AdminNavigation({ children }: { children: React.ReactNode }) {
    const [navOpen, setNavOpen] = useState(true);

    return (
        <div className="fixed pt-[90px] flex h-screen w-full z-[5] text-white">
            <div
                className={`relative flex flex-col gap-[15px] transition-all duration-300 ease-in-out ml-[10px] ${
                    navOpen ? "w-[300px]" : "w-[90px]"
                }`}
                onMouseEnter={() => {
                    setNavOpen(true);
                }}
                onMouseLeave={() => {
                    setNavOpen(false);
                }}
            >
                <button
                    className="absolute top-[8px] right-0 flex gap-[15px] items-center cursor-pointer p-[7px] border border-white/10 rounded-xl hover:bg-white group transition-all duration-300"
                    onClick={() => setNavOpen(!navOpen)}
                >
                    <BackIcon
                        className={`w-[18px] stroke-white stroke-[50] fill-white group-hover:stroke-black transition-all duration-200 ${
                            navOpen ? "rotate-0" : "rotate-180"
                        }`}
                    />
                </button>
                <div
                    className={`flex flex-col gap-[15px] mt-[30px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[15px]`}
                >
                    {adminPanelNavigationLinks.map(({ href, Icon, text }) => (
                        <AdminNavigationLink
                            href={href}
                            navOpen={navOpen}
                            key={text}
                        >
                            <Icon className="w-[32px] h-[32px] min-w-[32px] min-h-[32px] fill-white group-hover:fill-black " />
                            <NavigationHideTextWrapper navOpen={navOpen}>
                                {text}
                            </NavigationHideTextWrapper>
                        </AdminNavigationLink>
                    ))}
                </div>

                <div
                    className={`flex flex-col gap-[20px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[15px] ${
                        navOpen ? "justify-start" : "justify-center"
                    }`}
                >
                    <div
                        onClick={() =>
                            toast.success(
                                "Ви успішно вийшли з панелі адміністратора"
                            )
                        }
                    >
                        <AdminNavigationLink href={"/"} navOpen={navOpen}>
                            <LogoutIcon className="w-[25px] h-[25px] min-w-[25px] min-h-[25px] fill-white group-hover:fill-black" />
                            <NavigationHideTextWrapper navOpen={navOpen}>
                                Вийти з панелі
                            </NavigationHideTextWrapper>
                        </AdminNavigationLink>
                    </div>
                </div>
            </div>
            <div className="p-[30px] flex-1 overflow-y-auto">{children}</div>
        </div>
    );
}

export default AdminNavigation;
