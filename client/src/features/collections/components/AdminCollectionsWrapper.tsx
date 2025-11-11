"use client";

import { ErrorWithMessage } from "@/shared/ui/components";
import {
    AdminProductsSkeleton,
    ButtonSkeleton,
    FilterSectionSkeleton,
    TitleWithButtonSkeleton,
} from "@/shared/ui/skeletons";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AdminCollectionsContent } from "./AdminCollectionsContent";

export function AdminCollectionsWrapper() {
    return (
        <ErrorBoundary
            fallbackRender={() => (
                <ErrorWithMessage message="Виникла помилка отримання колекцій" />
            )}
        >
            <Suspense
                fallback={
                    <div className="flex flex-col gap-[15px]">
                        <ButtonSkeleton />
                        <TitleWithButtonSkeleton />
                        <FilterSectionSkeleton />
                        <AdminProductsSkeleton />
                    </div>
                }
            >
                <AdminCollectionsContent />
            </Suspense>
        </ErrorBoundary>
    );
}
