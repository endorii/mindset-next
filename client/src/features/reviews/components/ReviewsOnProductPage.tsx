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
        <div className="text-white p-[20px]">
            <div className="flex items-center gap-[7px] text-4xl md:text-2xl font-perandory tracking-wider">
                {hasReviews ? (
                    <div>Clients reviews ({reviews.length})</div>
                ) : (
                    <div>Reviews empty</div>
                )}
            </div>

            {hasReviews && (
                <div className="flex gap-[50px] w-full sm:flex-col mt-[15px]">
                    <AvgRatingStat reviews={reviews} />

                    <div className="flex flex-col gap-[25px] w-2/3 sm:w-full">
                        <ProductReviewsList reviews={reviews} />
                        <div className="w-full flex justify-center">
                            <MonoLink href={`${product?.path}/reviews`}>
                                Read all
                            </MonoLink>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
