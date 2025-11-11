"use client";

import { useGetProductByPath } from "@/features/products/hooks/useProducts";
import {
    AvgRatingStat,
    ProductReviewsList,
} from "@/features/reviews/components";
import { useReviewByProductId } from "@/features/reviews/hooks/useReviews";
import { BackIcon } from "@/shared/icons";
import { MonoButton } from "@/shared/ui/buttons";
import { Breadcrumbs, ErrorWithMessage } from "@/shared/ui/components";
import { ReviewPageSkeleton } from "@/shared/ui/skeletons";
import { usePathname, useRouter } from "next/navigation";

function Reviews() {
    const pathname = usePathname();
    const router = useRouter();

    const [collectionPath, categoryPath, productPath] = pathname
        .split("/")
        .filter(Boolean);

    const {
        data: product,
        isPending: isProductPending,
        isError: isProductError,
    } = useGetProductByPath(collectionPath, categoryPath, productPath);
    const {
        data: reviews,
        isPending: isReviewsPending,
        isError: isReviewsError,
        error: reviewsError,
    } = useReviewByProductId(product?.id);

    if (isProductPending || isReviewsPending) {
        return <ReviewPageSkeleton />;
    }

    if (isProductError) {
        return (
            <ErrorWithMessage message="Виникла помилка або товар не знайдено" />
        );
    }

    if (isReviewsError) {
        return <ErrorWithMessage message={reviewsError.message} />;
    }

    return (
        <div className="flex flex-col gap-[15px] px-[30px] py-[10px] sm:p-[10px] text-white/70 text-sm">
            <Breadcrumbs
                collectionPath={collectionPath}
                categoryPath={categoryPath}
                productPath={productPath}
            />

            <div>
                <MonoButton onClick={() => router.back()}>
                    <BackIcon className="w-[23px] stroke-white stroke-[50] group-hover:stroke-black" />
                    <div>Назад до товару</div>
                </MonoButton>
            </div>

            <div className="text-white rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <h2 className="text-2xl font-bold mb-4">
                    Відгуки про товар ({reviews?.length || 0})
                </h2>

                <div className="flex sm:flex-col gap-[15px]">
                    {reviews && reviews.length > 0 ? (
                        <AvgRatingStat reviews={reviews} />
                    ) : null}

                    <div
                        className={`flex flex-col gap-[10px] ${
                            reviews && reviews.length > 0
                                ? "w-2/3 sm:w-full"
                                : "w-full"
                        }`}
                    >
                        {reviews && reviews.length > 0 ? (
                            <ProductReviewsList reviews={reviews} />
                        ) : (
                            <div className="text-white/50">Немає відгуків</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reviews;
