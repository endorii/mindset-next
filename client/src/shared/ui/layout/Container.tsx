"use client";

import { usePathname } from "next/navigation";

interface ContainerProps {
    children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
    const pathname = usePathname();

    return (
        <div className={`${pathname === "/" ? "pt-0" : "pt-[85px]"} px-[0px]`}>
            {children}
        </div>
    );
}
