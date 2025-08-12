import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { IReview } from "../types/reviews.types";

const API_BASE_URL = "http://localhost:5000/api";

interface ToggleReviewVotePayload {
    reviewId: string;
    isHelpful: boolean;
}

export async function toggleReviewVote(data: ToggleReviewVotePayload): Promise<IReview> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/reviews/${data.reviewId}/vote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ isHelpful: data.isHelpful }),
        });
        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Не вдалося надіслати голос");
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function fetchAllReviews(): Promise<IReview[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/reviews`, {
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function fetchReviewsByProductId(productId: string): Promise<IReview[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/reviews/product/${productId}`, {
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function fetchReviewsByUserId(): Promise<IReview[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/reviews/user`, {
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function createReview(data: IReview): Promise<ServerResponseWithMessage<IReview>> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function updateReview(
    reviewId: string,
    data: Partial<IReview>
): Promise<ServerResponseWithMessage<IReview>> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/reviews/admin-reply/${reviewId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function approveReview(reviewId: string): Promise<ServerResponseWithMessage> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/reviews/${reviewId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function deleteReview(reviewId: string): Promise<ServerResponseWithMessage> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/reviews/${reviewId}`, {
            method: "DELETE",
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}
