"use client";

import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { BackIcon } from "@/shared/icons";
import { formatDate } from "@/shared/utils/formatDate";
import { toast } from "sonner";
import { useToggleReviewVote } from "../hooks/useReviews";
import { IReview } from "../types/reviews.types";

interface ProductReviewsListProps {
    reviews: IReview[];
}

export function ProductReviewsList({ reviews }: ProductReviewsListProps) {
    const { data: user, isPending: isUserPending } = useCurrentUser();
    const useToggleReviewVoteMutaion = useToggleReviewVote();

    return (
        <div className="flex flex-col gap-[5px] w-full">
            {reviews && reviews.filter((r) => r.isApproved).length > 0 ? (
                reviews
                    .filter((review) => review.isApproved && review.id)
                    .map((review) => {
                        const isLiked = review.userVote?.isHelpful === true;
                        const isDisliked = review.userVote?.isHelpful === false;

                        return (
                            <div
                                key={review.id}
                                className="flex flex-col gap-[10px]"
                            >
                                <div className="flex flex-col gap-[10px] border border-white/5 bg-white/5 p-[20px]">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <div className="font-perandory tracking-wider text-xl">
                                                {review.senderName}
                                            </div>
                                            <div className="text-xs text-neutral-300 font-light">
                                                {formatDate(review.createdAt)}
                                            </div>
                                        </div>

                                        <div className="flex text-white text-xl mb-2">
                                            {Array.from({ length: 5 }).map(
                                                (_, i) => (
                                                    <span key={i}>
                                                        {i <
                                                        Number(review.rating)
                                                            ? "★"
                                                            : "☆"}
                                                    </span>
                                                )
                                            )}
                                        </div>

                                        <div className="text-sm font-light">
                                            {review.content}
                                        </div>

                                        <div className="mt-3 flex gap-[10px] text-sm">
                                            <button
                                                disabled={
                                                    useToggleReviewVoteMutaion.isPending
                                                }
                                                className={`flex items-center gap-[5px] px-[10px] py-[7px] border transition hover:bg-black/20 disabled:opacity-50 ${
                                                    isLiked
                                                        ? "bg-white/10 border-white/30"
                                                        : "border-white/5"
                                                }`}
                                                onClick={() => {
                                                    if (!user) {
                                                        toast.info(
                                                            "You must be logged in to rate a review"
                                                        );
                                                        return;
                                                    }
                                                    if (review.id) {
                                                        useToggleReviewVoteMutaion.mutateAsync(
                                                            {
                                                                reviewId:
                                                                    review.id,
                                                                isHelpful: true,
                                                            }
                                                        );
                                                    }
                                                }}
                                            >
                                                <BackIcon className="fill-white w-[20px] stroke-white stroke-50 rotate-90" />{" "}
                                                {review.isHelpful}
                                            </button>

                                            <button
                                                disabled={
                                                    useToggleReviewVoteMutaion.isPending
                                                }
                                                className={`flex items-center gap-[5px] px-[10px] py-[7px] border transition hover:bg-black/20 disabled:opacity-50 ${
                                                    isDisliked
                                                        ? "bg-white/10 border-white/30"
                                                        : "border-white/5"
                                                }`}
                                                onClick={() => {
                                                    if (!user) {
                                                        toast.info(
                                                            "You must be logged in to rate a review"
                                                        );
                                                        return;
                                                    }
                                                    if (review.id) {
                                                        useToggleReviewVoteMutaion.mutateAsync(
                                                            {
                                                                reviewId:
                                                                    review.id,
                                                                isHelpful:
                                                                    false,
                                                            }
                                                        );
                                                    }
                                                }}
                                            >
                                                <BackIcon className="fill-white w-[20px] stroke-white stroke-50 rotate-270" />{" "}
                                                {review.isNotHelpful}
                                            </button>
                                        </div>
                                    </div>

                                    {review.adminReply && (
                                        <div className="flex flex-col gap-[10px] border border-white/5 bg-white/3 p-[20px]">
                                            <div className="flex justify-between gap-[10px] text-sm font-semibold text-white">
                                                <div className="font-perandory tracking-wider text-xl">
                                                    Admin's answer
                                                </div>
                                                <div className="text-xs text-neutral-300 font-light">
                                                    {formatDate(
                                                        review.adminReplyAt
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-sm font-light">
                                                {review.adminReply}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })
            ) : (
                <div className="p-[30px] text-center text-2xl xs:text-xl text-neutral-200">
                    No reviews available.
                </div>
            )}
        </div>
    );
}
