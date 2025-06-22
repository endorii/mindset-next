import axios from "axios";
import { IProduct } from "@/types/product/product.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function uploadImage(file: File): Promise<{ path: string }> {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post<{ path: string }>(
            `${API_BASE_URL}/upload/image`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Axios upload image error:", error);
        throw new Error("Помилка завантаження зображення");
    }
}

export async function uploadImages(files: File[]): Promise<{ paths: string[] }> {
    try {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });
        const response = await axios.post<{ paths: string[] }>(
            `${API_BASE_URL}/upload/images`,
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Axios upload images error:", error);
        throw new Error("Помилка завантаження зображення");
    }
}

export async function deleteImage(path: string): Promise<void> {
    try {
        await axios.delete(`${API_BASE_URL}/upload/image`, {
            params: { path: path },
        });
    } catch (error) {
        console.error("Axios delete image error:", error);
        throw new Error("Помилка при видаленні зображення");
    }
}

export async function deleteImages(imagePaths: IProduct["images"]): Promise<void> {
    try {
        await axios.delete(`${API_BASE_URL}/upload/images`, {
            data: { paths: imagePaths },
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        console.error("Axios delete images error:", error);
        throw new Error("Помилка при масовому видаленні зображень");
    }
}
