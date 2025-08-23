"use client";

import { ErrorFallback } from "@/shared/components";
import { ProductsListSkeleton } from "@/shared/ui/skeletons";
import React, { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import ProductsContent from "./ProductsContent";

function ProductsWrapper({
    collectionPath,
    categoryPath,
}: {
    collectionPath: string;
    categoryPath: string;
}) {
    const [showSkeleton, setShowSkeleton] = useState(true);

    // Затримка для показу скелетона
    useEffect(() => {
        const timeout = setTimeout(() => setShowSkeleton(false), 200);
        return () => clearTimeout(timeout);
    }, []);

    if (showSkeleton) return <ProductsListSkeleton />;
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<ProductsListSkeleton />}>
                <ProductsContent
                    collectionPath={collectionPath}
                    categoryPath={categoryPath}
                />
            </Suspense>
        </ErrorBoundary>
    );
}

export default ProductsWrapper;
