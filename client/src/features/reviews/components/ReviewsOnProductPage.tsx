"use client";

import { IProduct } from "@/features/products/types/products.types";
import { MonoLink } from "@/shared/ui/buttons";
import { ErrorWithMessage } from "@/shared/ui/components";
import {
    ProductReviewsSkeleton,
    ReviewsValueSkeleton,
} from "@/shared/ui/skeletons";
import { useReviewByProductId } from "../hooks/useReviews";
import { AvgRatingStat } from "./AvgRatingStat";
import { ProductReviewsList } from "./ProductReviewsList";

interface ReviewsOnProductPageProps {
    product: IProduct | null;
}

export function ReviewsOnProductPage({ product }: ReviewsOnProductPageProps) {
    const {
        data: reviews,
        isPending: isReviewsPending,
        isError: isReviewsError,
        error: reviewsError,
    } = useReviewByProductId(product?.id);

    if (isReviewsPending) {
        return (
            <div className="text-white rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <ReviewsValueSkeleton />
                <ProductReviewsSkeleton />
            </div>
        );
    }

    if (isReviewsError) {
        return <ErrorWithMessage message={reviewsError.message} />;
    }

    const hasReviews = reviews && reviews.length > 0;

    return (
        <div className="text-white rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="flex items-center gap-[7px] text-2xl md:text-xl font-bold">
                {hasReviews ? (
                    <div>Відгуки про товар ({reviews.length})</div>
                ) : (
                    <div>Відгуки відсутні</div>
                )}
            </div>

            {hasReviews && (
                <div className="flex sm:flex-col gap-[15px] mt-[15px]">
                    <AvgRatingStat reviews={reviews} />

                    <div className="flex flex-col gap-[10px] w-2/3 sm:w-full">
                        <ProductReviewsList reviews={reviews} />
                        <MonoLink href={`${product?.path}/reviews`}>
                            Читати всі відгуки
                        </MonoLink>
                    </div>
                </div>
            )}
        </div>
    );
}
