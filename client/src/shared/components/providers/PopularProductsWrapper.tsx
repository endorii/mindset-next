"use client";

import { Suspense, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import PopularProducts from "../PopularProducts";
import { ProductsSliderSkeleton } from "@/shared/ui/skeletons";
import { ErrorWithMessage } from "@/shared/ui/components";

function PopularProductsWrapper() {
    const [showSkeleton, setShowSkeleton] = useState(true);

    // Затримка для показу скелетона
    useEffect(() => {
        const timeout = setTimeout(() => setShowSkeleton(false), 200);
        return () => clearTimeout(timeout);
    }, []);

    if (showSkeleton) return <ProductsSliderSkeleton />;
    return (
        <ErrorBoundary
            fallbackRender={() => (
                <ErrorWithMessage
                    message={"Помилка отримання популярних товарів"}
                />
            )}
        >
            <Suspense fallback={<ProductsSliderSkeleton />}>
                <PopularProducts />
            </Suspense>
        </ErrorBoundary>
    );
}

export default PopularProductsWrapper;
