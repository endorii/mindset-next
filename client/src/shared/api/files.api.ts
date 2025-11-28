import { httpServiceAuth } from "@/shared/api/httpService";
import { BannerEntity, ImagesEntity } from "../types/types";

export async function uploadBanner(
    type: BannerEntity,
    entityId: string,
    banner: File
): Promise<{ path: string }> {
    try {
        const formData = new FormData();
        formData.append("banner", banner);

        const { data } = await httpServiceAuth.post(
            `/files/upload/${type}/banner/${entityId}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function uploadImages(
    type: ImagesEntity,
    entityId: string,
    images: File[]
): Promise<{ paths: string[] }> {
    try {
        const formData = new FormData();
        images.forEach((image) => formData.append("images", image));

        const { data } = await httpServiceAuth.post(
            `files/upload/${type}/images/${entityId}`,
            formData,
            {
                headers: { "Content-Type": "multipart/form-data" },
            }
        );

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
