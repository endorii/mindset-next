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

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка завантаження зображення");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch upload image error:", error);
        throw new Error("Помилка завантаження зображення");
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

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка завантаження зображень");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch upload images error:", error);
        throw new Error("Помилка завантаження зображень");
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

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка при видаленні зображення");
        }
    } catch (error) {
        console.error("Fetch delete image error:", error);
        throw new Error("Помилка при видаленні зображення");
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

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка при масовому видаленні зображень");
        }
    } catch (error) {
        console.error("Fetch delete images error:", error);
        throw new Error("Помилка при масовому видаленні зображень");
    }
}
