import { httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { IReview } from "../types/reviews.types";

interface ToggleReviewVotePayload {
    reviewId: string;
    isHelpful: boolean;
}

export async function toggleReviewVote(payload: ToggleReviewVotePayload): Promise<IReview> {
    try {
        const { data } = await httpServiceAuth.post(`/shop/reviews/${payload.reviewId}/vote`, {
            isHelpful: payload.isHelpful,
        });
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function fetchAllReviews(): Promise<IReview[]> {
    try {
        const { data } = await httpServiceAuth.get("/admin/reviews");
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function fetchReviewsByProductId(productId: string): Promise<IReview[]> {
    try {
        const { data } = await httpServiceAuth.get(`/shop/reviews/product/${productId}`);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function fetchReviewsByUserId(): Promise<IReview[]> {
    try {
        const { data } = await httpServiceAuth.get("/shop/reviews/user");
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function createReview(payload: IReview): Promise<ServerResponseWithMessage<IReview>> {
    try {
        const { data } = await httpServiceAuth.post("/shop/reviews", payload);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function updateReview(
    reviewId: string,
    payload: Partial<IReview>
): Promise<ServerResponseWithMessage<IReview>> {
    try {
        const { data } = await httpServiceAuth.patch(
            `/admin/reviews/admin-reply/${reviewId}`,
            payload
        );
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function approveReview(reviewId: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.patch(`/admin/reviews/${reviewId}`);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function deleteReview(reviewId: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.delete(`/shop/reviews/${reviewId}`);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

function handleHttpError(error: any): never {
    const message = error?.response?.data?.message || error.message || "Unknown server error";

    const status = error?.response?.status;

    const err: any = new Error(message);
    if (status) err.status = status;

    throw err;
}
