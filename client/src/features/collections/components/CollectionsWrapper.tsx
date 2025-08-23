"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CollectionsAndCategoriesListSkeleton from "@/shared/ui/skeletons/CollectionsAndCategoriesListSkeleton";
import CollectionsContent from "./CollectionsContent";
import { ErrorFallback } from "@/shared/components";

export default function CollectionsWrapper() {
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
                <CollectionsContent />
            </Suspense>
        </ErrorBoundary>
    );
}
