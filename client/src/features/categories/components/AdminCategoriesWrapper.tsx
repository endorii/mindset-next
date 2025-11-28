"use client";

import { ErrorWithMessage } from "@/shared/ui/components";
import {
    AdminProductsSkeleton,
    ButtonSkeleton,
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
                    <div className="flex flex-col gap-[20px]">
                        <ButtonSkeleton />
                        <TitleWithButtonSkeleton />
                        <hr className="border border-b border-white/5" />
                        <AdminProductsSkeleton />
                    </div>
                }
            >
                <AdminCategoriesContent collectionId={collectionId} />
            </Suspense>
        </ErrorBoundary>
    );
}
