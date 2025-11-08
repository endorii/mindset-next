import { httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { ISize, ISizePayload } from "../types/product-size.types";

export async function fetchSizes(): Promise<ISize[]> {
    try {
        const { data } = await httpServiceAuth.get("/admin/sizes");
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function createSize(
    payload: ISizePayload
): Promise<ServerResponseWithMessage<ISizePayload>> {
    try {
        const { data } = await httpServiceAuth.post("/admin/sizes", payload);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function editSize(
    sizeId: string,
    payload: Partial<ISize>
): Promise<ServerResponseWithMessage<ISize>> {
    try {
        const { data } = await httpServiceAuth.patch(`/admin/sizes/${sizeId}`, payload);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function deleteSize(sizeId: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.delete(`/admin/sizes/${sizeId}`);
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
