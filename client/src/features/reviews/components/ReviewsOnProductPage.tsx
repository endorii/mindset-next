import MonoLink from "@/shared/ui/buttons/MonoLink";
import React, { useMemo } from "react";
import { useReviewByProductId } from "../hooks/useReviews";
import { formatDate } from "@/shared/utils/formatDate";

interface ReviewsOnProductPageProps {
    productId: string;
}

function ReviewsOnProductPage({ productId }: ReviewsOnProductPageProps) {
    const {
        data: reviews,
        isLoading,
        isError,
    } = useReviewByProductId(productId);

    // Підрахунок кількості відгуків за рейтингом
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

    // Загальна кількість відгуків
    const total = useMemo(() => {
        return Object.values(ratingCounts).reduce((sum, val) => sum + val, 0);
    }, [ratingCounts]);

    // Обчислення середньої оцінки
    const averageRating = useMemo(() => {
        if (!reviews || reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + Number(r.rating), 0);
        return sum / reviews.length;
    }, [reviews]);

    if (isLoading) return <div>Завантаження відгуків...</div>;
    if (isError) return <div>Помилка при завантаженні відгуків</div>;

    return (
        <div className="text-white rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <h2 className="text-2xl font-bold mb-4">
                Відгуки про товар ({reviews?.length || 0})
            </h2>

            <div className="flex flex-col md:flex-row gap-8">
                {/* Ліва колонка - статистика рейтингів */}
                <div className="flex flex-col gap-[20px] w-full md:w-1/3">
                    <div className="flex gap-[7px] text-xl mb-4 ">
                        <div className="font-light text-white/40">
                            Середня оцінка користувачів
                        </div>
                        <span className="font-semibold text-white">
                            {averageRating.toFixed(2)}/5 ★
                        </span>
                    </div>

                    <div className="flex flex-col gap-[10px]">
                        {[5, 4, 3, 2, 1].map((rating) => {
                            const count = ratingCounts[rating];
                            const percent = total
                                ? Math.round((count / total) * 100)
                                : 0;

                            return (
                                <div
                                    key={rating}
                                    className="flex items-center gap-2 mb-1"
                                >
                                    <span className="w-5 text-sm">
                                        {rating}
                                    </span>
                                    <div className="flex-1 border border-white/10 rounded h-5 overflow-hidden">
                                        <div
                                            className="bg-white h-full transition-all duration-300"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                    <span className="text-sm w-8 text-right">
                                        {count}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Права колонка - список відгуків */}
                <div className="flex flex-col gap-[5px] w-full md:w-2/3">
                    {reviews &&
                    reviews.filter((r) => r.isApproved).length > 0 ? (
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
                                                    {formatDate(
                                                        review.createdAt
                                                    )}
                                                </span>
                                            </div>

                                            {/* Зірки */}
                                            <div className="flex text-white-500 text-xl mb-2">
                                                {Array.from({ length: 5 }).map(
                                                    (_, i) => (
                                                        <span key={i}>
                                                            {i <
                                                            Number(
                                                                review.rating
                                                            )
                                                                ? "★"
                                                                : "☆"}
                                                        </span>
                                                    )
                                                )}
                                            </div>

                                            <div className="text-sm">
                                                {review.content}
                                            </div>

                                            <div className="mt-3 flex gap-2 text-sm">
                                                <div className="flex items-center gap-1 px-[10px] py-[7px] border border-white/10 rounded-xl cursor-pointer hover:bg-black/20">
                                                    <span
                                                        role="img"
                                                        aria-label="like"
                                                    >
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

                                    <MonoLink href={"#"}>
                                        Читати всі відгуки
                                    </MonoLink>
                                </div>
                            ))
                    ) : (
                        <div className="p-[30px] text-center text-2xl">
                            Відгуки відсутні
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ReviewsOnProductPage;
