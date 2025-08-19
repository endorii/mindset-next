import { IProduct } from "@/features/products/types/products.types";
import { MonoLink } from "@/shared/ui/buttons";
import { useReviewByProductId } from "../hooks/useReviews";
import AvgRatingStat from "./AvgRatingStat";
import ProductReviewsList from "./ProductReviewsList";
import ReviewsValueSkeleton from "@/shared/ui/skeletons/ReviewsValueSkeleton";
import ProductReviewsSkeleton from "@/shared/ui/skeletons/ProductReviewsSkeleton";

interface ReviewsOnProductPageProps {
    product: IProduct;
}

function ReviewsOnProductPage({ product }: ReviewsOnProductPageProps) {
    const { data: reviews, isPending: isReviewsPending } = useReviewByProductId(
        product.id
    );

    return (
        <div className="text-white rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="flex items-center gap-[7px] text-2xl md:text-xl font-bold">
                {reviews && reviews.length > 0 ? (
                    <div>Відгуки про товар ({reviews?.length})</div>
                ) : isReviewsPending ? (
                    <ReviewsValueSkeleton />
                ) : (
                    <div>відсутні</div>
                )}
            </div>
            {reviews && reviews.length > 0 ? (
                <div className="flex sm:flex-col gap-[15px] mt-[15px]">
                    <AvgRatingStat reviews={reviews} />

                    <div
                        className={`flex flex-col gap-[10px] ${
                            reviews.length > 0 ? "w-2/3 sm:w-full" : "w-full"
                        } `}
                    >
                        <ProductReviewsList reviews={reviews} />
                        {reviews.length > 0 ? (
                            <MonoLink href={`${product.path}/reviews`}>
                                Читати всі відгуки
                            </MonoLink>
                        ) : null}
                    </div>
                </div>
            ) : isReviewsPending ? (
                <ProductReviewsSkeleton />
            ) : null}
        </div>
    );
}

export default ReviewsOnProductPage;
