import { IProduct } from "@/features/products/types/products.types";
import { MonoLink } from "@/shared/ui/buttons";
import { useReviewByProductId } from "../hooks/useReviews";
import AvgRatingStat from "./AvgRatingStat";
import ProductReviewsList from "./ProductReviewsList";

interface ReviewsOnProductPageProps {
    product: IProduct;
}

function ReviewsOnProductPage({ product }: ReviewsOnProductPageProps) {
    const {
        data: reviews,
        isPending,
        isError,
    } = useReviewByProductId(product.id);

    return (
        <div className="text-white rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <h2 className="text-2xl md:text-xl font-bold mb-4">
                Відгуки про товар ({reviews?.length || 0})
            </h2>
            {reviews && reviews.length > 0 ? (
                <div className="flex sm:flex-col gap-[15px]">
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
            ) : null}
        </div>
    );
}

export default ReviewsOnProductPage;
