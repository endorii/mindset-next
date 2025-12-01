"use client";

import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { BackIcon } from "@/shared/icons";
import { formatDate } from "@/shared/utils";
import Image from "next/image";
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
                        const isLiked = review.reviewVotes?.some(
                            (vote) =>
                                vote.userId === user?.id &&
                                vote.isHelpful === true
                        );

                        const isDisliked = review.reviewVotes?.some(
                            (vote) =>
                                vote.userId === user?.id &&
                                vote.isHelpful === false
                        );

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

                                        {review.images && (
                                            <div className="flex flex-col gap-[3px]">
                                                <div className="flex flex-wrap gap-[15px] mt-4 max-w-[700px]">
                                                    {review.images.length >
                                                    0 ? (
                                                        review.images.map(
                                                            (image, i) => (
                                                                <Image
                                                                    key={i}
                                                                    src={image}
                                                                    alt={`Images ${
                                                                        i + 1
                                                                    }`}
                                                                    width={150}
                                                                    height={150}
                                                                    className="w-[150px] object-contain"
                                                                />
                                                            )
                                                        )
                                                    ) : (
                                                        <div className="text-white opacity-50">
                                                            No images
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        <div className="mt-3 flex gap-[10px] text-sm">
                                            <button
                                                disabled={
                                                    useToggleReviewVoteMutaion.isPending
                                                }
                                                className={`flex group items-center gap-[5px] px-[10px] py-[7px] border transition hover:bg-white/10 hover:text-white disabled:opacity-50 border-white/5 ${
                                                    isLiked &&
                                                    "bg-white text-black border-white/30"
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
                                                <BackIcon
                                                    className={`w-[20px] stroke-50 rotate-90 group-hover:fill-white group-hover:stroke-white ${
                                                        isLiked
                                                            ? "fill-black stroke-black"
                                                            : "fill-white stroke-white"
                                                    }`}
                                                />{" "}
                                                {review.isHelpful}
                                            </button>

                                            <button
                                                disabled={
                                                    useToggleReviewVoteMutaion.isPending
                                                }
                                                className={`flex group items-center gap-[5px] px-[10px] py-[7px] border transition border-white/5 hover:bg-white/10 hover:text-white disabled:opacity-50 ${
                                                    isDisliked &&
                                                    "bg-white text-black border-white/30"
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
                                                <BackIcon
                                                    className={`w-[20px] stroke-50 rotate-270 group-hover:fill-white group-hover:stroke-white ${
                                                        isDisliked
                                                            ? "fill-black stroke-black"
                                                            : "fill-white stroke-white"
                                                    }`}
                                                />{" "}
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
