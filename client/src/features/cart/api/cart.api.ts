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
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function fetchAllCartItemsFromUser(userId: string): Promise<ICartItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/${userId}`, {
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

export async function deleteCartItemFromUser(userId: string, productId: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/cart/${userId}/${productId}`, {
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
