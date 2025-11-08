import { httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { IColor, IColorPayload } from "../types/product-color.types";

export async function fetchColors(): Promise<IColor[]> {
    try {
        const { data } = await httpServiceAuth.get("/admin/colors");
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function createColor(
    payload: IColorPayload
): Promise<ServerResponseWithMessage<IColor>> {
    try {
        const { data } = await httpServiceAuth.post("/admin/colors", payload);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function editColor(
    colorId: string,
    payload: Partial<IColor>
): Promise<ServerResponseWithMessage<IColor>> {
    try {
        const { data } = await httpServiceAuth.patch(`/admin/colors/${colorId}`, payload);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function deleteColor(colorId: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.delete(`/admin/colors/${colorId}`);
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
