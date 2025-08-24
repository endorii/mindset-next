"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import CollectionsAndCategoriesListSkeleton from "@/shared/ui/skeletons/CollectionsAndCategoriesListSkeleton";
import CollectionsContent from "./CollectionsContent";
import { ErrorWithMessage } from "@/shared/ui/components";

export default function CollectionsWrapper() {
    return (
        <ErrorBoundary
            fallbackRender={() => (
                <ErrorWithMessage message={"Помилка отримання колекцій"} />
            )}
        >
            <Suspense fallback={<CollectionsAndCategoriesListSkeleton />}>
                <CollectionsContent />
            </Suspense>
        </ErrorBoundary>
    );
}
