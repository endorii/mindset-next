"use client";

import JustColorsSkeleton from "@/shared/ui/skeletons/JustColorsSkeleton";
import { useProductColors } from "../hooks/useProducts";

export function ProductCardColors({ productId }: { productId: string }) {
    const {
        data: colors,
        isPending: isColorsPending,
        isError: isColorsError,
    } = useProductColors(productId);
    return (
        <ul className="absolute top-[10px] left-[10px] flex gap-[5px] backdrop-blur-lg border border-white/20 p-[2px]">
            {colors && colors.length > 0 ? (
                colors.map((color) => (
                    <li
                        key={color.color.hexCode}
                        className="w-[25px] h-[25px]"
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
