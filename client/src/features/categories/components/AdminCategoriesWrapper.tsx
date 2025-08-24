"use client";

import { ErrorWithMessage } from "@/shared/ui/components";
import {
    TitleWithButtonSkeleton,
    FilterSectionSkeleton,
    AdminProductsSkeleton,
    ButtonSkeleton,
} from "@/shared/ui/skeletons";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

import AdminCategoriesContent from "./AdminCategoriesContent";

function AdminCategoriesWrapper({
    collectionPath,
}: {
    collectionPath: string;
}) {
    return (
        <ErrorBoundary
            fallbackRender={({ error }) => (
                <ErrorWithMessage message={error.message} />
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
                <AdminCategoriesContent collectionPath={collectionPath} />
            </Suspense>
        </ErrorBoundary>
    );
}

export default AdminCategoriesWrapper;
