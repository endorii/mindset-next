import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { IFavoriteItem } from "../types/favorites.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchFavoritesFromUser(): Promise<IFavoriteItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/favorites`, {
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

export async function addFavoriteToUser(productId: string): Promise<ServerResponseWithMessage> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/favorites`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ productId }),
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

export async function deleteFavoriteFromUser(
    productId: string
): Promise<ServerResponseWithMessage> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/favorites/${productId}`, {
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
