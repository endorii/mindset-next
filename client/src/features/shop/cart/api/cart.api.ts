import { ICartItem } from "../types/cart.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function addCartItemToUser(cartItem: ICartItem): Promise<ICartItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/cart`, {
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

export async function fetchAllCartItemsFromUser(): Promise<ICartItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/cart`, {
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

export async function deleteCartItemFromUser(cartItemId: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/cart/${cartItemId}`, {
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

export async function deleteCartFromUser(): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/cart`, {
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
