"use client";

import { ErrorWithMessage } from "@/shared/ui/components";
import {
    AdminProductsSkeleton,
    FilterSectionSkeleton,
} from "@/shared/ui/skeletons";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AdminReviewsContent } from "./AdminReviewsContent";

export function AdminReviewsWrapper() {
    return (
        <ErrorBoundary
            fallbackRender={({ error }) => (
                <ErrorWithMessage message={error.message} />
            )}
        >
            <Suspense
                fallback={
                    <div className="flex flex-col gap-[10px]">
                        <FilterSectionSkeleton />
                        <AdminProductsSkeleton />
                    </div>
                }
            >
                <AdminReviewsContent />
            </Suspense>
        </ErrorBoundary>
    );
}
