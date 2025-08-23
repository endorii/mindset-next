"use client";

import { CollectionsAndCategoriesListSkeleton } from "@/shared/ui/skeletons";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense, useEffect, useState } from "react";
import { ErrorFallback } from "@/shared/components";
import CategoriesContent from "./CategoriesContent";

function CategoriesWrapper() {
    const [showSkeleton, setShowSkeleton] = useState(true);

    // Затримка для показу скелетона
    useEffect(() => {
        const timeout = setTimeout(() => setShowSkeleton(false), 200);
        return () => clearTimeout(timeout);
    }, []);

    if (showSkeleton) return <CollectionsAndCategoriesListSkeleton />;
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<CollectionsAndCategoriesListSkeleton />}>
                <CategoriesContent />
            </Suspense>
        </ErrorBoundary>
    );
}

export default CategoriesWrapper;
