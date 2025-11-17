"use client";

import { usePopularProducts } from "@/features/products/hooks/useProducts";
import { ProductsListSkeleton } from "../ui/skeletons";
import { SliderWrapper } from "./layout";

export function PopularProducts() {
    const { data: popularProducts, isPending } = usePopularProducts();

    if (!popularProducts || popularProducts.length === 0) {
        return null;
    }

    if (!popularProducts && isPending) {
        return <ProductsListSkeleton />;
    }

    return (
        <SliderWrapper
            productsList={popularProducts}
            title="Our Best-Selling Essentials"
        />
    );
}
