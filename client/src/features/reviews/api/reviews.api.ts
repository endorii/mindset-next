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

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Не вдалося надіслати голос");
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function fetchAllReviews(): Promise<IReview[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/reviews`, {
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function fetchReviewsByProductId(productId: string): Promise<IReview[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/reviews/product/${productId}`, {
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function fetchReviewsByUserId(): Promise<IReview[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/reviews/user`, {
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function createReview(data: IReview): Promise<IReview> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/reviews`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function updateReview(reviewId: string, data: Partial<IReview>): Promise<IReview> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/reviews/admin-reply/${reviewId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function approveReview(reviewId: string): Promise<IReview> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/reviews/${reviewId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function deleteReview(reviewId: string): Promise<IReview> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/reviews/${reviewId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}
