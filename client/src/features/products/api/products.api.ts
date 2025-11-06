import { http, httpAuth } from "@/features/auth/api/axiosInstances";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { AxiosError } from "axios";
import { ICreateProductPayload, IProduct } from "../types/products.types";

export async function fetchProductsByCategoryId(categoryId: string): Promise<IProduct[]> {
    try {
        const { data } = await http.get<IProduct[]>(`/shop/products/categories/${categoryId}`);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchGetProductByPath(
    collectionPath: string,
    categoryPath: string,
    productPath: string
): Promise<IProduct> {
    try {
        const { data } = await http.get<IProduct>(
            `/shop/products/${collectionPath}/${categoryPath}/${productPath}`
        );
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchPopularProducts(): Promise<IProduct[]> {
    try {
        const { data } = await http.get<IProduct[]>(`/shop/products/popular`);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchProductsFromSameCollection(collectionPath: string): Promise<IProduct[]> {
    try {
        const { data } = await http.get<IProduct[]>(`/shop/products/collections/${collectionPath}`);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function addProductToCategory(
    productData: ICreateProductPayload
): Promise<ServerResponseWithMessage<ICreateProductPayload>> {
    try {
        const { data } = await httpAuth.post<ServerResponseWithMessage<ICreateProductPayload>>(
            `/admin/products`,
            productData
        );
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function editProduct(
    productId: string,
    productData: Partial<ICreateProductPayload>
): Promise<ServerResponseWithMessage<ICreateProductPayload>> {
    try {
        const { data } = await httpAuth.patch<ServerResponseWithMessage<ICreateProductPayload>>(
            `/admin/products/${productId}`,
            productData
        );
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function deleteProduct(productId: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpAuth.delete<ServerResponseWithMessage>(
            `/admin/products/${productId}`
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
