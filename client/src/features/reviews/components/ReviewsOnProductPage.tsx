import MonoLink from "@/shared/ui/buttons/MonoLink";
import React, { useMemo } from "react";
import { useReviewByProductId } from "../hooks/useReviews";
import { formatDate } from "@/shared/utils/formatDate";
import { IProduct } from "@/features/products/types/products.types";
import AvgRatingStat from "./AvgRatingStat";
import ProductReviewsList from "./ProductReviewsList";

interface ReviewsOnProductPageProps {
    product: IProduct;
}

function ReviewsOnProductPage({ product }: ReviewsOnProductPageProps) {
    const {
        data: reviews,
        isLoading,
        isError,
    } = useReviewByProductId(product.id);

    const ratingCounts = useMemo(() => {
        const counts: { [key: number]: number } = {
            5: 0,
            4: 0,
            3: 0,
            2: 0,
            1: 0,
        };

        reviews?.forEach((review) => {
            const rating = Number(review.rating);
            if (rating >= 1 && rating <= 5) {
                counts[rating]++;
            }
        });

        return counts;
    }, [reviews]);

    if (isLoading) return <div>Завантаження відгуків...</div>;
    if (isError) return <div>Помилка при завантаженні відгуків</div>;
    if (!reviews) return <div>Немає відгуків</div>;

    return (
        <div className="text-white rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <h2 className="text-2xl font-bold mb-4">
                Відгуки про товар ({reviews?.length || 0})
            </h2>

            <div className="flex flex-col md:flex-row gap-8">
                {reviews.length > 0 ? (
                    <AvgRatingStat reviews={reviews} />
                ) : null}

                <div
                    className={`flex flex-col gap-[10px] ${
                        reviews.length > 0 ? "w-2/3" : "w-full"
                    } `}
                >
                    <ProductReviewsList product={product} reviews={reviews} />
                    {reviews.length > 0 ? (
                        <MonoLink href={`${product.path}/reviews`}>
                            Читати всі відгуки
                        </MonoLink>
                    ) : null}
                </div>
            </div>
        </div>
    );
}

export default ReviewsOnProductPage;
