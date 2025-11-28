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

import { AdminCategoriesContent } from "./AdminCategoriesContent";

export function AdminCategoriesWrapper({
    collectionId,
}: {
    collectionId: string;
}) {
    return (
        <ErrorBoundary
            fallbackRender={({ error }) => (
                <ErrorWithMessage message={error.message} />
            )}
        >
            <Suspense
                fallback={
                    <div className="flex flex-col gap-[10px]">
                        <ButtonSkeleton />
                        <TitleWithButtonSkeleton />
                        <FilterSectionSkeleton />
                        <AdminProductsSkeleton />
                    </div>
                }
            >
                <AdminCategoriesContent collectionId={collectionId} />
            </Suspense>
        </ErrorBoundary>
    );
}
