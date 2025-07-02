import { IColor, IColorPayload } from "../types/product-color.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchColors(): Promise<IColor[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/colors`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка отримання кольорів");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching colors:", error);
        throw new Error("Помилка отримання кольорів");
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
            throw new Error(errorData.message || "Помилка створення кольору");
        }

        const result = await response.json();
        console.log(result.message);
        return result.color;
    } catch (error) {
        console.error("Fetch error creating color:", error);
        throw new Error("Помилка створення кольору");
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
            throw new Error(errorData.message || "Не вдалося оновити колір");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error updating color:", error);
        throw new Error("Не вдалося оновити колір");
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
            throw new Error(errorData.message || "Не вдалося видалити колір");
        }
    } catch (error) {
        console.error("Fetch error deleting color:", error);
        throw new Error("Не вдалося видалити колір");
    }
}
