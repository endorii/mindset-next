import { ICartItem } from "../types/cart.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function addCartItemToUser(userId: string, cartItem: ICartItem): Promise<ICartItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(cartItem),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка додавання товару в кошик");
        }
        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching cart:", error);
        throw new Error("Помилка додавання товару в кошик");
    }
}

export async function fetchAllCartItemsFromUser(userId: string): Promise<ICartItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка отримання товарів з кошика");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching cart:", error);
        throw new Error("Помилка отримання товарів з кошика");
    }
}

export async function deleteCartItemFromUser(userId: string, productId: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/${userId}/${productId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Не вдалося видалити улюблений товар");
        }
    } catch (error) {
        console.error("Fetch error deleting cart item:", error);
        throw new Error("Не вдалося видалити товар з кошика");
    }
}
