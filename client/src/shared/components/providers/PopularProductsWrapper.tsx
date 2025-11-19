"use client";

import { ErrorWithMessage } from "@/shared/ui/components";
import { ProductsSliderSkeleton } from "@/shared/ui/skeletons";
import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { PopularProducts } from "../PopularProducts";

export function PopularProductsWrapper() {
    const [showSkeleton, setShowSkeleton] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setShowSkeleton(false), 200);
        return () => clearTimeout(timeout);
    }, []);

    if (showSkeleton) return <ProductsSliderSkeleton />;
    return (
        <ErrorBoundary
            fallbackRender={() => (
                <ErrorWithMessage
                    message={"Error retrieving popular products"}
                />
            )}
        >
            <Suspense fallback={<ProductsSliderSkeleton />}>
                <PopularProducts />
            </Suspense>
        </ErrorBoundary>
    );
}
