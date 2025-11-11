"use client";

import { ChooseButton } from "@/shared/ui/buttons";
import { ErrorWithMessage } from "@/shared/ui/components";
import {
    ColorsSkeleton,
    SizesAndTypesSkeleton,
    TitleWithButtonSkeleton,
} from "@/shared/ui/skeletons";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ColorSection } from "../product-colors/components/ColorSection";
import { SizeSection } from "../product-sizes/components/SizeSection";
import { TypeSection } from "../product-types/components/TypeSection";

export function AttributesContent() {
    const ATTRIBUTES = ["кольори", "типи", "розміри"];
    const [selectedAttribute, setSelectedAttribute] =
        useState<string>("кольори");

    return (
        <div className="flex flex-col gap-[15px]">
            <div className="flex xs:flex-col items-center xs:items-start gap-[10px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[10px] w-full">
                {ATTRIBUTES.map((attr, i) => (
                    <ChooseButton
                        key={i}
                        isActive={attr === selectedAttribute}
                        onClick={() => setSelectedAttribute(attr)}
                        className="w-full"
                    >
                        {attr}
                    </ChooseButton>
                ))}
            </div>

            {selectedAttribute === "кольори" && (
                <ErrorBoundary
                    fallbackRender={({ error }) => (
                        <ErrorWithMessage message={error.message} />
                    )}
                >
                    <Suspense
                        fallback={
                            <div className="flex flex-col gap-[15px]">
                                <TitleWithButtonSkeleton />
                                <ColorsSkeleton />
                            </div>
                        }
                    >
                        <ColorSection />
                    </Suspense>
                </ErrorBoundary>
            )}

            {selectedAttribute === "типи" && (
                <ErrorBoundary
                    fallbackRender={({ error }) => (
                        <ErrorWithMessage message={error.message} />
                    )}
                >
                    <Suspense
                        fallback={
                            <div className="flex flex-col gap-[15px]">
                                <TitleWithButtonSkeleton />
                                <SizesAndTypesSkeleton />
                            </div>
                        }
                    >
                        <TypeSection />
                    </Suspense>
                </ErrorBoundary>
            )}

            {selectedAttribute === "розміри" && (
                <ErrorBoundary
                    fallbackRender={({ error }) => (
                        <ErrorWithMessage message={error.message} />
                    )}
                >
                    <Suspense
                        fallback={
                            <div className="flex flex-col gap-[15px]">
                                <TitleWithButtonSkeleton />
                                <SizesAndTypesSkeleton />
                            </div>
                        }
                    >
                        <SizeSection />
                    </Suspense>
                </ErrorBoundary>
            )}
        </div>
    );
}
