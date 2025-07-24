"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface ContainerProps {
    children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
    const pathname = usePathname();

    return (
        <div className={`${pathname === "/" ? "pt-0" : "pt-[85px]"} px-[0px]`}>
            {children}
        </div>
    );
};

export default Container;
