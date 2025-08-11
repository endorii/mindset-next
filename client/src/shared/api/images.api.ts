import { IProduct } from "@/features/products/types/products.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function uploadImage(file: File): Promise<{ path: string }> {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await fetch(`${API_BASE_URL}/upload/image`, {
            method: "POST",
            credentials: "include",
            body: formData,
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

export async function uploadImages(files: File[]): Promise<{ paths: string[] }> {
    try {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });

        const response = await fetch(`${API_BASE_URL}/upload/images`, {
            method: "POST",
            body: formData,
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

export async function deleteImage(path: string): Promise<void> {
    try {
        const url = new URL(`${API_BASE_URL}/upload/image`);
        url.searchParams.append("path", path);

        const response = await fetch(url.toString(), {
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

export async function deleteImages(imagePaths: IProduct["images"]): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/upload/images`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ paths: imagePaths }),
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
