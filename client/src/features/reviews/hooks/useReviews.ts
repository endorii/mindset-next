import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
    fetchAllReviews,
    fetchReviewsByProductId,
    fetchReviewsByUserId,
    createReview,
    updateReview,
    approveReview,
    deleteReview,
} from "../api/reviews.api";
import { IReview } from "../types/reviews.types";

export function useReviews() {
    return useQuery({
        queryKey: ["reviews"],
        queryFn: () => fetchAllReviews(),
    });
}

export function useReviewByProductId(productId: string) {
    return useQuery({
        queryKey: ["reviews"],
        queryFn: () => fetchReviewsByProductId(productId),
        enabled: !!productId,
    });
}

export function useReviewByUserId() {
    return useQuery({
        queryKey: ["reviews", "user"],
        queryFn: () => fetchReviewsByUserId(),
    });
}

export function useCreateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: IReview) => createReview(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["reviews"],
            });
        },
    });
}

export function useEditReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ reviewId, data }: { reviewId: string; data: Partial<IReview> }) =>
            updateReview(reviewId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });
}

export function useApproveReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reviewId: string) => approveReview(reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });
}

export function useDeleteReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reviewId: string) => deleteReview(reviewId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
    });
}
