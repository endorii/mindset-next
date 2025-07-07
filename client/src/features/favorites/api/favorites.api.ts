import { IFavoriteItem } from "../types/favorites.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function addFavoriteToUser(
    userId: string,
    favoriteItem: IFavoriteItem
): Promise<IFavoriteItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/favorites/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(favoriteItem),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка додавання товару в улюблене");
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error add item to favorites:", error);
        throw new Error("Помилка додавання товару в улюблене");
    }
}

export async function fetchFavoritesFromUser(userId: string): Promise<IFavoriteItem> {
    try {
        const response = await fetch(`${API_BASE_URL}/favorites/${userId}`, {
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message || "Помилка отримання товару з улюблених користувача"
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching items from user favorites:", error);
        throw new Error("Помилка отримання товарів з улюблених користувача");
    }
}

export async function deleteFavoriteFromUser(userId: string, productId: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/favorites/${userId}/${productId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Не вдалося видалити товар з улюблених");
        }
    } catch (error) {
        console.error("Fetch error deleting item from favorites:", error);
        throw new Error("Не вдалося видалити товар з улюблених");
    }
}
