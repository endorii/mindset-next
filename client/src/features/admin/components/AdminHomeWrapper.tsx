"use client";

import { ErrorWithMessage } from "@/shared/ui/components";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AdminHomeContent from "./AdminHomeContent";
import {
    LineChartSkeleton,
    FastStatSkeleton,
    RecentActionsSkeleton,
    TodoSkeleton,
} from "@/shared/ui/skeletons";

function AdminHomeWrapper() {
    return (
        <ErrorBoundary
            fallbackRender={({ error }) => (
                <ErrorWithMessage message={error.message} />
            )}
        >
            <Suspense
                fallback={
                    <>
                        <LineChartSkeleton />
                        <FastStatSkeleton />
                        <div className="flex lg:flex-col gap-[15px]">
                            <RecentActionsSkeleton />
                            <TodoSkeleton />
                        </div>
                    </>
                }
            >
                <AdminHomeContent />
            </Suspense>
        </ErrorBoundary>
    );
}

export default AdminHomeWrapper;
