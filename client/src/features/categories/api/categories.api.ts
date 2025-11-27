import { ICollection } from "@/features/collections/types/collections.types";
import { httpService, httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { AxiosError } from "axios";
import { ICategory } from "../types/categories.types";

export async function fetchShopCategoryByPath(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"]
): Promise<ICategory> {
    try {
        const { data } = await httpService.get<ICategory>(
            `/shop/categories/${collectionPath}/${categoryPath}`
        );
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchAdminCategoryByPath(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"]
): Promise<ICategory> {
    try {
        const { data } = await httpServiceAuth.get<ICategory>(
            `/admin/categories/collections/${collectionPath}/${categoryPath}`
        );
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchGetShopCategoriesByCollectionId(
    collectionId: string
): Promise<ICategory[]> {
    try {
        const { data } = await httpService.get<ICategory[]>(`/shop/categories/${collectionId}`);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchGetAdminCategoriesByCollectionId(
    collectionId: string
): Promise<ICategory[]> {
    try {
        const { data } = await httpServiceAuth.get<ICategory[]>(
            `/admin/categories/collections/${collectionId}`
        );
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function addCategoryToCollection(
    categoryData: Omit<ICategory, "banner">
): Promise<ServerResponseWithMessage<Omit<ICategory, "banner">>> {
    try {
        const { data } = await httpServiceAuth.post<ServerResponseWithMessage<ICategory>>(
            `/admin/categories`,
            categoryData
        );
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function editCategory(
    categoryId: string,
    data: Partial<ICategory>
): Promise<ServerResponseWithMessage<ICategory>> {
    try {
        const { data: responseData } = await httpServiceAuth.patch<
            ServerResponseWithMessage<ICategory>
        >(`/admin/categories/${categoryId}`, data);
        return responseData;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function deleteCategory(categoryId: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.delete<ServerResponseWithMessage>(
            `/admin/categories/${categoryId}`
        );
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
