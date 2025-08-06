import { formatDate } from "@/shared/utils/formatDate";
import { IReview } from "../types/reviews.types";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { useToggleReviewVote } from "../hooks/useReviews";
import { toast } from "sonner";

interface ProductReviewsListProps {
    reviews: IReview[];
}

function ProductReviewsList({ reviews }: ProductReviewsListProps) {
    const { data: user } = useCurrentUser();
    const { mutateAsync: toggleVote, isPending } = useToggleReviewVote();

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
                                className="flex flex-col gap-[15px]"
                            >
                                <div className="flex flex-col gap-[15px] border border-white/10 bg-white/3 rounded-lg p-[20px] shadow-sm">
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

                                        <div className="text-sm">
                                            {review.content}
                                        </div>

                                        <div className="mt-3 flex gap-[10px] text-sm">
                                            <button
                                                disabled={isPending}
                                                className={`flex items-center gap-[5px] px-[10px] py-[7px] border rounded-xl cursor-pointer transition hover:bg-black/20 disabled:opacity-50 ${
                                                    isLiked
                                                        ? "bg-white/10 border-white/30"
                                                        : "border-white/10"
                                                }`}
                                                onClick={() => {
                                                    if (!user) {
                                                        toast.info(
                                                            "Щоб оцінити відгук потрібно увійти в акаунт"
                                                        );
                                                        return;
                                                    }
                                                    if (review.id) {
                                                        toggleVote({
                                                            reviewId: review.id,
                                                            isHelpful: true,
                                                        });
                                                    } else {
                                                        console.error(
                                                            "Review ID is missing"
                                                        );
                                                    }
                                                }}
                                            >
                                                👍 {review.isHelpful}
                                            </button>

                                            <button
                                                disabled={isPending}
                                                className={`flex items-center gap-[5px] px-[10px] py-[7px] border rounded-xl cursor-pointer transition hover:bg-black/20 disabled:opacity-50 ${
                                                    isDisliked
                                                        ? "bg-white/10 border-white/30"
                                                        : "border-white/10"
                                                }`}
                                                onClick={() => {
                                                    if (!user) {
                                                        toast.info(
                                                            "Щоб оцінити відгук потрібно увійти в акаунт"
                                                        );
                                                        return;
                                                    }
                                                    if (review.id) {
                                                        toggleVote({
                                                            reviewId: review.id,
                                                            isHelpful: false,
                                                        });
                                                    } else {
                                                        console.error(
                                                            "Review ID is missing"
                                                        );
                                                    }
                                                }}
                                            >
                                                👎 {review.isNotHelpful}
                                            </button>
                                        </div>
                                    </div>

                                    {review.adminReply && (
                                        <div className="flex flex-col gap-[10px] border border-white/10 bg-white/3 rounded-lg p-[20px] mb-4 shadow-sm">
                                            <div className="flex justify-between gap-[10px] text-sm font-semibold text-white/70">
                                                <div>
                                                    Відповідь адміністратора
                                                </div>
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
                        );
                    })
            ) : (
                <div className="p-[30px] text-center text-2xl xs:text-xl text-white/60">
                    Відгуки відсутні
                </div>
            )}
        </div>
    );
}

export default ProductReviewsList;
