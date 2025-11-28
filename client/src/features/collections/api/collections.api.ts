import { httpService, httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { AxiosError } from "axios";
import { ICollection } from "../types/collections.types";

export async function fetchShopCollections(): Promise<ICollection[]> {
    try {
        const { data } = await httpService.get("/shop/collections");
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchAdminCollections(): Promise<ICollection[]> {
    try {
        const { data } = await httpServiceAuth.get("/admin/collections");
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchShopCollectionByPath(collectionPath: string): Promise<ICollection> {
    try {
        const { data } = await httpService.get(`/shop/collections/${collectionPath}`);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchAdminCollection(collectionId: string): Promise<ICollection> {
    try {
        const { data } = await httpServiceAuth.get(`/admin/collections/${collectionId}`);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function createCollection(
    collectionData: ICollection
): Promise<ServerResponseWithMessage<ICollection>> {
    try {
        const { data } = await httpServiceAuth.post("/admin/collections", collectionData);
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
        const { data } = await httpServiceAuth.patch(
            `admin/collections/${collectionId}`,
            collectionData
        );
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function deleteCollection(collectionId: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.delete(`admin/collections/${collectionId}`);
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
