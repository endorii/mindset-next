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

    if (recentlyViewedProductsListPending) {
        return <ProductsSliderSkeleton />;
    }

    return recentlyViewedProductsList ? (
        <SliderWrapper
            productsList={recentlyViewedProductsList}
            title="Recently viewed"
        />
    ) : (
        <div>The product list is empty</div>
    );
}
