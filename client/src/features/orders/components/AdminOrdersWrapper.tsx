"use client";

import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AdminOrdersContent from "./AdminOrdersContent";
import { ErrorWithMessage } from "@/shared/ui/components";
import { error } from "console";
import {
    FilterSectionSkeleton,
    AdminProductsSkeleton,
} from "@/shared/ui/skeletons";

function AdminOrdersWrapper() {
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

export default AdminOrdersWrapper;
