import { useMemo } from "react";
import { IReview } from "../types/reviews.types";

interface AvgRatingStatProps {
    reviews: IReview[];
}

export function AvgRatingStat({ reviews }: AvgRatingStatProps) {
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

    const total = useMemo(() => {
        return Object.values(ratingCounts).reduce((sum, val) => sum + val, 0);
    }, [ratingCounts]);

    const averageRating = useMemo(() => {
        if (!reviews || reviews.length === 0) return 0;
        const sum = reviews.reduce((acc, r) => acc + Number(r.rating), 0);
        return sum / reviews.length;
    }, [reviews]);

    return (
        <div className="flex flex-col gap-[15px] w-1/3 sm:w-full">
            <div className="flex items-center gap-[10px] mb-[10px] ">
                <div className="font-light text-base text-neutral-400">
                    Average clients review score
                </div>
                <span className=" text-xl font-semibold text-white">
                    {averageRating.toFixed(2)}/5 ★
                </span>
            </div>

            <div className="flex flex-col gap-[7px]">
                {[5, 4, 3, 2, 1].map((rating) => {
                    const count = ratingCounts[rating];
                    const percent = total
                        ? Math.round((count / total) * 100)
                        : 0;

                    return (
                        <div
                            key={rating}
                            className="flex items-center gap-[7px] mb-1"
                        >
                            <span className="w-5 text-sm">{rating}★</span>
                            <div className="flex-1 border border-white/10 h-5 overflow-hidden">
                                <div
                                    className="bg-white h-full transition-all duration-300"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                            <span className="text-sm w-5 text-right">
                                {count}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
