"use client";

import { usePopularProducts } from "@/features/products/hooks/useProducts";
import SliderWrapper from "./layout/SliderWrapper";

function PopularProducts() {
    const { data: popularProducts } = usePopularProducts();

    if (!popularProducts || popularProducts.length === 0) {
        null;
    }

    return (
        <SliderWrapper
            productsList={popularProducts}
            title="Найбільш популярні товари"
        />
    );
}

export default PopularProducts;
