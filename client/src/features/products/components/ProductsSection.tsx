"use client";

import { EmptyCategories } from "@/shared/components";
import { IProduct } from "../types/products.types";
import ProductsContent from "./ProductsContent";
export default function ProductsSection({
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
                title="Наш віртуальний склад щойно отримав оновлення..."
                subtitle="Вибачте за незручності — товари ще в процесі сортування"
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
