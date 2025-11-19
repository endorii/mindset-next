import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
    approveReview,
    createReview,
    deleteReview,
    fetchAllReviews,
    fetchReviewsByProductId,
    fetchReviewsByUserId,
    updateReview,
} from "../api/reviews.api";
import { IReview } from "../types/reviews.types";

import { toast } from "sonner";
import { toggleReviewVote } from "../api/reviews.api";

export function useToggleReviewVote() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: { reviewId: string; isHelpful: boolean }) => toggleReviewVote(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        },
    });
}

export function useReviews() {
    return useSuspenseQuery({
        queryKey: ["reviews"],
        queryFn: () => fetchAllReviews(),
    });
}

export function useReviewByProductId(productId: string | undefined) {
    return useQuery({
        queryKey: ["reviews", productId],
        queryFn: () => fetchReviewsByProductId(productId || ""),
        enabled: !!productId,
    });
}

export function useReviewByUserId() {
    return useQuery({
        queryKey: ["reviews", "currentUser"],
        queryFn: () => fetchReviewsByUserId(),
    });
}

export function useCreateReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: IReview) => createReview(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["reviews"],
            });
            toast.success(data.message);
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        },
    });
}

export function useEditReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ reviewId, data }: { reviewId: string; data: Partial<IReview> }) =>
            updateReview(reviewId, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            toast.success(data.message);
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        },
    });
}

export function useApproveReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reviewId: string) => approveReview(reviewId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            toast.success(data.message);
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        },
    });
}

export function useDeleteReview() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (reviewId: string) => deleteReview(reviewId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["reviews"] });
            toast.success(data.message);
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        },
    });
}
