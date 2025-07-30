import { formatDate } from "@/shared/utils/formatDate";
import React from "react";
import { IReview } from "../types/reviews.types";
import { IProduct } from "@/features/products/types/products.types";

interface ProductReviewsListProps {
    product: IProduct;
    reviews: IReview[];
}

function ProductReviewsList({ product, reviews }: ProductReviewsListProps) {
    return (
        <div className="flex flex-col gap-[5px] w-full">
            {reviews && reviews.filter((r) => r.isApproved).length > 0 ? (
                reviews
                    .filter((review) => review.isApproved)
                    .map((review) => (
                        <div
                            key={review.id}
                            className="flex flex-col gap-[20px]"
                        >
                            <div className="flex flex-col gap-[20px] border border-white/10 bg-white/3 rounded-lg p-4 shadow-sm">
                                <div>
                                    <div className="flex justify-between mb-1">
                                        <span className="font-semibold">
                                            {review.senderName}
                                        </span>
                                        <span className="text-xs text-white/50">
                                            {formatDate(review.createdAt)}
                                        </span>
                                    </div>

                                    <div className="flex text-white-500 text-xl mb-2">
                                        {Array.from({
                                            length: 5,
                                        }).map((_, i) => (
                                            <span key={i}>
                                                {i < Number(review.rating)
                                                    ? "★"
                                                    : "☆"}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="text-sm">
                                        {review.content}
                                    </div>

                                    <div className="mt-3 flex gap-2 text-sm">
                                        <div className="flex items-center gap-1 px-[10px] py-[7px] border border-white/10 rounded-xl cursor-pointer hover:bg-black/20">
                                            <span role="img" aria-label="like">
                                                👍
                                            </span>{" "}
                                            {review.isHelpful}
                                        </div>
                                        <div className="flex items-center gap-1 px-[10px] py-[7px] border border-white/10 rounded-xl cursor-pointer hover:bg-black/20">
                                            <span
                                                role="img"
                                                aria-label="dislike"
                                            >
                                                👎
                                            </span>{" "}
                                            {review.isNotHelpful}
                                        </div>
                                    </div>
                                </div>

                                {review.adminReply && (
                                    <div className="flex flex-col gap-[10px] border border-white/10 bg-white/3 rounded-lg p-4 mb-4 shadow-sm">
                                        <div className="flex justify-between gap-[10px] text-sm font-semibold text-white/70">
                                            <div>Відповідь адміністратора</div>
                                            <div className="text-xs text-white/50">
                                                {formatDate(
                                                    review.adminReplyAt
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-sm">
                                            {review.adminReply}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
            ) : (
                <div className="p-[30px] text-center text-2xl">
                    Відгуки відсутні
                </div>
            )}
        </div>
    );
}

export default ProductReviewsList;
