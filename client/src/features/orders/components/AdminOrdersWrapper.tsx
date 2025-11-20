"use client";

import { ErrorWithMessage } from "@/shared/ui/components";
import {
    AdminProductsSkeleton,
    FilterSectionSkeleton,
} from "@/shared/ui/skeletons";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AdminOrdersContent } from "./AdminOrdersContent";

export function AdminOrdersWrapper() {
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
                        <FilterSectionSkeleton />
                        <AdminProductsSkeleton />
                    </div>
                }
            >
                <AdminOrdersContent />
            </Suspense>
        </ErrorBoundary>
    );
}
