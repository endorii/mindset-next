import { IProduct } from "@/features/products/types/products.types";
import { httpServiceAuth } from "@/shared/api/httpService";

export async function uploadImage(file: File): Promise<{ path: string }> {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const { data } = await httpServiceAuth.post("/upload/image", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function uploadImages(files: File[]): Promise<{ paths: string[] }> {
    try {
        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        const { data } = await httpServiceAuth.post("/upload/images", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function deleteImage(path: string): Promise<void> {
    try {
        const { data } = await httpServiceAuth.delete("/upload/image", {
            params: { path },
        });

        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function deleteImages(imagePaths: IProduct["images"]): Promise<void> {
    try {
        const { data } = await httpServiceAuth.delete("/upload/images", {
            data: { paths: imagePaths },
        });

        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

function handleHttpError(error: any): never {
    const message = error?.response?.data?.message || error.message || "Unknown server error";
    const status = error?.response?.status;
    const err: any = new Error(message);
    if (status) err.status = status;
    throw err;
}
