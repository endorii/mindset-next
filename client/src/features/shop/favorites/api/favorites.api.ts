import { IFavoriteItem } from "../types/favorites.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchFavoritesFromUser(): Promise<IFavoriteItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/favorites`, {
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

export async function addFavoriteToUser(productId: string): Promise<IFavoriteItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ productId }),
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

export async function deleteFavoriteFromUser(productId: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/favorites/${productId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }
        return;
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}
