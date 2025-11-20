"use client";

import { ErrorWithMessage } from "@/shared/ui/components";
import {
    FastStatMiniSkeleton,
    FastStatSkeleton,
    LineChartSkeleton,
    PieChartSkeleton,
} from "@/shared/ui/skeletons";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { StatsContent } from "./StatsContent";

export function StatsWrapper() {
    return (
        <ErrorBoundary
            fallbackRender={({ error }) => (
                <ErrorWithMessage message={error.message} />
            )}
        >
            <Suspense
                fallback={
                    <div className="flex flex-col gap-[10px]">
                        <div className="flex flex-col gap-[10px]">
                            <LineChartSkeleton />
                            <FastStatSkeleton />
                        </div>
                        <div className="flex md:flex-col gap-[15px]">
                            <PieChartSkeleton />
                            <FastStatMiniSkeleton />
                        </div>
                        <div className="flex md:flex-col gap-[15px]">
                            <PieChartSkeleton />
                            <FastStatMiniSkeleton />
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <LineChartSkeleton />
                            <FastStatSkeleton />
                        </div>
                    </div>
                }
            >
                <StatsContent />
            </Suspense>
        </ErrorBoundary>
    );
}
