"use client";

import "swiper/css";
import { SkeletonProductCard } from "./ProductsListSkeleton";

function ProductsSliderSkeleton({ slides = 5 }) {
    return (
        <div className="flex flex-col gap-[15px] p-[30px] sm:p-[10px] text-white">
            <div className="h-[25px] w-[250px] bg-white/10 animate-pulse"></div>
            <div className="flex gap-[15px] justify between">
                {Array.from({ length: slides }).map((_, i) => (
                    <SkeletonProductCard key={i} />
                ))}
            </div>
        </div>
    );
}

export default ProductsSliderSkeleton;
