import { ISize, ISizePayload } from "../types/product-size.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchSizes(): Promise<ISize[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/sizes`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка отримання розмірів");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching sizes:", error);
        throw new Error("Помилка отримання розмірів");
    }
}

export async function createSize(data: ISizePayload): Promise<ISize> {
    try {
        const response = await fetch(`${API_BASE_URL}/sizes`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка створення розміру");
        }

        const result = await response.json();
        console.log(result.message);
        return result.size;
    } catch (error) {
        console.error("Fetch error creating size:", error);
        throw new Error("Помилка створення розміру");
    }
}

export async function editSize(sizeId: ISize["id"], data: Partial<ISize>): Promise<ISize> {
    try {
        const response = await fetch(`${API_BASE_URL}/sizes/${sizeId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Не вдалося оновити розмір");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error updating size:", error);
        throw new Error("Не вдалося оновити розмір");
    }
}

export async function deleteSize(sizeId: ISize["id"]): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/sizes/${sizeId}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Не вдалося видалити розмір");
        }
    } catch (error) {
        console.error("Fetch error deleting size:", error);
        throw new Error("Не вдалося видалити розмір");
    }
}
