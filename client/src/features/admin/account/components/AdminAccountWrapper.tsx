"use client";

import { ErrorWithMessage } from "@/shared/ui/components";
import {
    FilterSectionSkeleton,
    RecentActionsSkeleton,
} from "@/shared/ui/skeletons";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AdminAccountContent from "./AdminAccountContent";

function AdminAccountWrapper() {
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
                        <FilterSectionSkeleton />
                        <RecentActionsSkeleton />
                    </div>
                }
            >
                <AdminAccountContent />
            </Suspense>
        </ErrorBoundary>
    );
}

export default AdminAccountWrapper;
