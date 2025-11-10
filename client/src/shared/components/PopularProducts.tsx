"use client";

import { usePopularProducts } from "@/features/products/hooks/useProducts";
import SliderWrapper from "./layout/SliderWrapper";

function PopularProducts() {
    const { data: popularProducts } = usePopularProducts();

    console.log(popularProducts);

    if (!popularProducts || popularProducts.length === 0) {
        return null;
    }

    return (
        <SliderWrapper
            productsList={popularProducts}
            title="Найбільш популярні товари"
        />
    );
}

export default PopularProducts;
