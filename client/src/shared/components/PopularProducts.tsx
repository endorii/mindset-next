"use client";

import { usePopularProducts } from "@/features/products/hooks/useProducts";
import { ProductsSliderSkeleton } from "../ui/skeletons";
import { SliderWrapper } from "./layout";

export function PopularProducts() {
    const { data: popularProducts, isPending } = usePopularProducts();

    if (!popularProducts && isPending) {
        return <ProductsSliderSkeleton />;
    }

    if (!popularProducts || popularProducts.length === 0) {
        return null;
    }

    console.log(popularProducts);

    return (
        <SliderWrapper
            productsList={popularProducts}
            title="Our Best-Selling Essentials"
        />
    );
}
