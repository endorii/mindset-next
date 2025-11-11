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
    collectionPath,
    categoryPath,
}: {
    collectionPath: string;
    categoryPath: string;
}) {
    return (
        <ErrorBoundary
            fallbackRender={() => (
                <ErrorWithMessage message="Помилка завантаження колекцій" />
            )}
        >
            <Suspense
                fallback={
                    <div className="flex flex-col gap-[15px]">
                        <TitleWithButtonSkeleton />
                        <FilterSectionSkeleton />
                        <AdminProductsSkeleton />
                    </div>
                }
            >
                <AdminProductsContent
                    collectionPath={collectionPath}
                    categoryPath={categoryPath}
                />
            </Suspense>
        </ErrorBoundary>
    );
}
