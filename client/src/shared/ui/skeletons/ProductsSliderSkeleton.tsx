"use client";

import { useLayoutEffect, useState } from "react";
import { SkeletonProductCard } from "./ProductsListSkeleton";

const getSlidesCount = (width: number) => {
    if (width <= 360) return 1;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    if (width <= 992) return 2;
    if (width <= 1200) return 3;
    if (width <= 1399) return 4;
    return 5;
};

export function ProductsSliderSkeleton() {
    const [slidesCount, setSlidesCount] = useState(1);
    const [mounted, setMounted] = useState(false);

    useLayoutEffect(() => {
        setMounted(true);

        const updateSlidesCount = () => {
            setSlidesCount(getSlidesCount(window.innerWidth));
        };

        updateSlidesCount();

        window.addEventListener("resize", updateSlidesCount);

        return () => window.removeEventListener("resize", updateSlidesCount);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="flex flex-col gap-[10px] p-[30px] sm:p-[10px] text-white">
            <div className="h-[40px] w-[320px] bg-white/10 animate-pulse"></div>
            <div className="grid grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-[15px] justify between">
                {Array.from({ length: slidesCount }).map((_, i) => (
                    <SkeletonProductCard key={i} />
                ))}
            </div>
        </div>
    );
}
