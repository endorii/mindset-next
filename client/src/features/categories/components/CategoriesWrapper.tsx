"use client";

import { CollectionsAndCategoriesListSkeleton } from "@/shared/ui/skeletons";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import CategoriesContent from "./CategoriesContent";
import { ErrorWithMessage } from "@/shared/ui/components";

export default function CategoriesWrapper() {
    return (
        <ErrorBoundary
            fallbackRender={() => (
                <ErrorWithMessage message={"Помилка отримання категорій"} />
            )}
        >
            <Suspense fallback={<CollectionsAndCategoriesListSkeleton />}>
                <CategoriesContent />
            </Suspense>
        </ErrorBoundary>
    );
}
