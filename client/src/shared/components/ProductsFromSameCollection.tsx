"use client";

import { useProductsFromSameCollection } from "@/features/products/hooks/useProducts";
import SliderWrapper from "./layout/SliderWrapper";
import ProductsSliderSkeleton from "../ui/skeletons/ProductsSliderSkeleton";
import { ErrorWithMessage } from "../ui/components";

interface ProductsFromSameCategoryProps {
    collectionId: string;
}

function ProductsFromSameCollection({
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
            title={"Товари з цієї ж колекції"}
        />
    ) : isProductsFromSameCollectionPending ? (
        <ProductsSliderSkeleton />
    ) : isProductsFromSameCollectionError ? (
        <ErrorWithMessage message="Виникла помилка під час завантаження товарів з цієї колекції" />
    ) : (
        <div>Список товарів порожній</div>
    );
}

export default ProductsFromSameCollection;
