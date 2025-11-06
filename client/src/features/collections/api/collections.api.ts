import { http, httpAuth } from "@/features/auth/api/axiosInstances";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { AxiosError } from "axios";
import { ICollection } from "../types/collections.types";

export async function fetchCollections(): Promise<ICollection[]> {
    try {
        const { data } = await http.get("/shop/collections");
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchGetCollectionByPath(collectionPath: string): Promise<ICollection> {
    try {
        const { data } = await http.get(`/shop/collections/${collectionPath}`);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function createCollection(
    collectionData: ICollection
): Promise<ServerResponseWithMessage<ICollection>> {
    try {
        const { data } = await httpAuth.post("/admin/collections", collectionData);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function editCollection(
    collectionId: string,
    collectionData: Partial<ICollection>
): Promise<ServerResponseWithMessage<ICollection>> {
    try {
        const { data } = await httpAuth.patch(`admin/collections/${collectionId}`, collectionData);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function deleteCollection(collectionId: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpAuth.delete(`admin/collections/${collectionId}`);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

function handleAxiosError(error: unknown): never {
    if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;
        const status = error.response?.status;
        const err: any = new Error(message);
        if (status) err.status = status;
        throw err;
    }
    throw error;
}
