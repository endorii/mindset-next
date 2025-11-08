import { httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { IType, ITypePayload } from "../types/product-type.types";

export async function fetchTypes(): Promise<IType[]> {
    try {
        const { data } = await httpServiceAuth.get("/admin/types");
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function createType(
    payload: ITypePayload
): Promise<ServerResponseWithMessage<ITypePayload>> {
    try {
        const { data } = await httpServiceAuth.post("/admin/types", payload);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function editType(
    typeId: string,
    payload: Partial<IType>
): Promise<ServerResponseWithMessage<IType>> {
    try {
        const { data } = await httpServiceAuth.patch(`/admin/types/${typeId}`, payload);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function deleteType(typeId: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.delete(`/admin/types/${typeId}`);
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
