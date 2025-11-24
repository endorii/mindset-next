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
    if (!products || products.length <= 0) {
        return (
            <EmptyCategories
                title="Warehouse is in the process of being prepared..."
                subtitle="Sorry for the inconvenience - we are preparing the best clothes for you."
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
