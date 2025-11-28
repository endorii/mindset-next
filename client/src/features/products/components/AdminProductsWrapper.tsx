"use client";

import { ErrorWithMessage } from "@/shared/ui/components";
import {
    AdminProductsSkeleton,
    FilterSectionSkeleton,
    TitleWithButtonSkeleton,
} from "@/shared/ui/skeletons";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { AdminProductsContent } from "./AdminProductsContent";

export function AdminProductsWrapper({
    collectionId,
    categoryId,
}: {
    collectionId: string;
    categoryId: string;
}) {
    return (
        <ErrorBoundary
            fallbackRender={() => (
                <ErrorWithMessage message="Error loading collections" />
            )}
        >
            <Suspense
                fallback={
                    <div className="flex flex-col gap-[10px]">
                        <TitleWithButtonSkeleton />
                        <FilterSectionSkeleton />
                        <AdminProductsSkeleton />
                    </div>
                }
            >
                <AdminProductsContent
                    collectionId={collectionId}
                    categoryId={categoryId}
                />
            </Suspense>
        </ErrorBoundary>
    );
}
