"use client";

import { useEffect, useState } from "react";
import SliderWrapper from "./layout/SliderWrapper";
import { IProduct } from "@/features/products/types/products.types";

function RecentlyViewedProducts() {
    const [recentlyViewedProductsList, setRecentlyViewedProductsList] =
        useState<IProduct[]>([]);
    const [
        recentlyViewedProductsListPending,
        setRecentlyViewedProductsListPending,
    ] = useState<boolean>(false);

    useEffect(() => {
        setRecentlyViewedProductsListPending(true);
        const stored = localStorage.getItem("recentlyViewed");
        if (stored) {
            setRecentlyViewedProductsList(JSON.parse(stored));
            setRecentlyViewedProductsListPending(false);
        }
    }, []);

    return (
        <SliderWrapper
            productsList={recentlyViewedProductsList}
            title="Останні переглянуті"
            emptyProductsTitle="Ще немає переглянутих товарів"
            isProductsListPending={recentlyViewedProductsListPending}
            isProductsListError={false}
        />
    );
}

export default RecentlyViewedProducts;
