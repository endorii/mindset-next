"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AdminReviewsContent from "./AdminReviewsContent";
import { ErrorWithMessage } from "@/shared/ui/components";
import {
    FilterSectionSkeleton,
    AdminProductsSkeleton,
} from "@/shared/ui/skeletons";

function AdminReviewsWrapper() {
    return (
        <ErrorBoundary
            fallbackRender={({ error }) => (
                <ErrorWithMessage message={error.message} />
            )}
        >
            <Suspense
                fallback={
                    <div className="flex flex-col gap-[15px]">
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

export default AdminReviewsWrapper;
