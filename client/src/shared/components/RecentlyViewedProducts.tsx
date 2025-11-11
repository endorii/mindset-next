"use client";

import { IProduct } from "@/features/products/types/products.types";
import { useEffect, useState } from "react";
import { ProductsSliderSkeleton } from "../ui/skeletons";
import { SliderWrapper } from "./layout";

export function RecentlyViewedProducts() {
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

    return recentlyViewedProductsList ? (
        <SliderWrapper
            productsList={recentlyViewedProductsList}
            title="Останні переглянуті"
        />
    ) : recentlyViewedProductsListPending ? (
        <ProductsSliderSkeleton />
    ) : (
        <div>Список товарів порожній</div>
    );
}
