"use client";

import { JustColorsSkeleton } from "@/shared/ui/skeletons";
import { useProductColors } from "../hooks/useProducts";

export function ProductCardColors({ productId }: { productId: string }) {
    const {
        data: colors,
        isPending: isColorsPending,
        isError: isColorsError,
    } = useProductColors(productId);
    return (
        <ul className="absolute top-[10px] md:top-[5px] left-[10px] md:left-[5px] flex gap-[5px] backdrop-blur-lg border border-white/20 p-[2px]">
            {colors && colors.length > 0 ? (
                colors.map((color) => (
                    <li
                        key={color.color.hexCode}
                        className="w-[25px] h-[25px] lg:w-[20px] lg:h-[20px] md:w-[15px] md:h-[15px]"
                        style={{
                            backgroundColor: color.color.hexCode,
                        }}
                    ></li>
                ))
            ) : isColorsPending ? (
                <JustColorsSkeleton />
            ) : isColorsError ? (
                "Can`t load colors"
            ) : null}
        </ul>
    );
}
