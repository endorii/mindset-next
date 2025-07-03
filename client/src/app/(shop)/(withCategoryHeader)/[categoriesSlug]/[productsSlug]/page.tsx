"use client";

import { notFound, usePathname } from "next/navigation";
import { useCategory } from "@/features/categories/hooks/useCategories";
import ProductCard from "@/features/products/components/ProductCard";
import DataListWrapper from "@/shared/ui/wrappers/DataListWrapper";
import H3 from "@/shared/ui/text/H3";

export default function CategoryPage() {
    const pathname = usePathname();

    const pathSegments = pathname.split("/").filter(Boolean);

    const collectionPath = pathSegments[0];
    const categoryPath = pathSegments[1];

    const { data: category, isLoading } = useCategory(
        collectionPath,
        categoryPath
    );

    const products = category?.products || [];

    if (isLoading) {
        return <p>Завантаження...</p>;
    }

    if (!category) {
        return notFound();
    }

    return (
        <div className="relative">
            <H3>
                {category.name} {category.collection?.name}
            </H3>
            <DataListWrapper
                existData={products}
                alternativeText={"Товари відстутні"}
            >
                {(item, i) => (
                    <ProductCard
                        collectionPath={collectionPath}
                        categoryPath={categoryPath}
                        item={item}
                        i={i}
                        key={i}
                    />
                )}
            </DataListWrapper>
        </div>
    );
}
