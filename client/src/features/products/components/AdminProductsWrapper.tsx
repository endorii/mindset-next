"use client";

import AdminCollectionsContent from "@/features/collections/components/AdminCollectionsContent";
import { ErrorWithMessage } from "@/shared/ui/components";
import {
    TitleWithButtonSkeleton,
    FilterSectionSkeleton,
    AdminProductsSkeleton,
} from "@/shared/ui/skeletons";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AdminProductsContent from "./AdminProductsContent";

function AdminProductsWrapper({
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

export default AdminProductsWrapper;
