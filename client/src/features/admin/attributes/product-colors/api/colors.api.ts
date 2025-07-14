import { IColor, IColorPayload } from "../types/product-color.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchColors(): Promise<IColor[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/colors`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function createColor(data: IColorPayload): Promise<IColor> {
    try {
        const response = await fetch(`${API_BASE_URL}/colors`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
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

export async function editColor(colorId: IColor["id"], data: Partial<IColor>): Promise<IColor> {
    try {
        const response = await fetch(`${API_BASE_URL}/colors/${colorId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
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

export async function deleteColor(colorId: IColor["id"]): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/colors/${colorId}`, {
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
