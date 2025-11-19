"use client";

import { EmptyCategories } from "@/shared/components";
import { IProduct } from "../types/products.types";
import { ProductsContent } from "./ProductsContent";

export function ProductsSection({
    collectionPath,
    categoryPath,
    products,
}: {
    collectionPath: string;
    categoryPath: string;
    products: IProduct[] | undefined;
}) {
    if (!products || products.length < 0) {
        return (
            <EmptyCategories
                title="Our virtual warehouse has just been updated..."
                subtitle="Sorry for the inconvenience - items are still being sorted"
            />
        );
    }

    return (
        <ProductsContent
            collectionPath={collectionPath}
            categoryPath={categoryPath}
            products={products}
        />
    );
}
