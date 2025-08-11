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

export async function fetchAllCartItemsFromUser(): Promise<ICartItem[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/cart`, {
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

export async function deleteCartItemFromUser(cartItemId: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/cart/${cartItemId}`, {
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

export async function deleteCartFromUser(): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/cart`, {
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
