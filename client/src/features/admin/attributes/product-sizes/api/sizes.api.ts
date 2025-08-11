import { ISize, ISizePayload } from "../types/product-size.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchSizes(): Promise<ISize[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/sizes`, {
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

export async function createSize(data: ISizePayload): Promise<ISize> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/sizes`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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

export async function editSize(sizeId: ISize["id"], data: Partial<ISize>): Promise<ISize> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/sizes/${sizeId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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

export async function deleteSize(sizeId: ISize["id"]): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/sizes/${sizeId}`, {
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
