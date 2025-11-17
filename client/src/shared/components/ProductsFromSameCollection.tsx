"use client";

import { useProductsFromSameCollection } from "@/features/products/hooks/useProducts";
import { ErrorWithMessage } from "../ui/components";
import { ProductsSliderSkeleton } from "../ui/skeletons";
import { SliderWrapper } from "./layout";

interface ProductsFromSameCategoryProps {
    collectionId: string;
}

export function ProductsFromSameCollection({
    collectionId,
}: ProductsFromSameCategoryProps) {
    const {
        data: productsFromSameCollection,
        isPending: isProductsFromSameCollectionPending,
        isError: isProductsFromSameCollectionError,
    } = useProductsFromSameCollection(collectionId);

    return collectionId && productsFromSameCollection ? (
        <SliderWrapper
            productsList={productsFromSameCollection}
            title={"Products from the same collection"}
        />
    ) : isProductsFromSameCollectionPending ? (
        <ProductsSliderSkeleton />
    ) : isProductsFromSameCollectionError ? (
        <ErrorWithMessage message="Виникла помилка під час завантаження товарів з цієї колекції" />
    ) : (
        <div>Список товарів порожній</div>
    );
}
