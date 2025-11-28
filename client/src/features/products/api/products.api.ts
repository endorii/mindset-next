import { httpService, httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { AxiosError } from "axios";
import {
    ICreateProductPayload,
    IProduct,
    IProductToColor,
    IProductToSize,
    IProductToType,
} from "../types/products.types";

export async function fetchCategoryProducts(categoryId: string): Promise<IProduct[]> {
    try {
        const { data } = await httpServiceAuth.get<IProduct[]>(
            `/admin/categories/${categoryId}/products`
        );
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
        const { data } = await httpService.get<IProduct>(
            `/shop/products/${collectionPath}/${categoryPath}/${productPath}`
        );
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchProductsByIds(ids: string[]): Promise<IProduct[]> {
    if (!ids || ids.length === 0) return [];

    try {
        const { data } = await httpService.get<IProduct[]>(
            `/shop/products/by-ids?ids=${ids.join(",")}`
        );
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchPopularProducts(): Promise<IProduct[]> {
    try {
        const { data } = await httpService.get<IProduct[]>(`/shop/products/utils/popular`);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchProductsFromSameCollection(collectionPath: string): Promise<IProduct[]> {
    try {
        const { data } = await httpService.get<IProduct[]>(
            `/shop/products/utils/collections/${collectionPath}`
        );
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function addProductToCategory(
    productData: ICreateProductPayload
): Promise<ServerResponseWithMessage<ICreateProductPayload>> {
    try {
        const { data } = await httpServiceAuth.post(`/admin/products`, productData);
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
        const { data } = await httpServiceAuth.patch(`/admin/products/${productId}`, productData);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function deleteProduct(productId: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.delete<ServerResponseWithMessage>(
            `/admin/products/${productId}`
        );
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchProductColors(id: string): Promise<IProductToColor[]> {
    try {
        const { data } = await httpService.get<IProductToColor[]>(`/shop/products/${id}/colors`);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchProductTypes(id: string): Promise<IProductToType[]> {
    try {
        const { data } = await httpService.get<IProductToType[]>(`/shop/products/${id}/types`);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function fetchProductSizes(id: string): Promise<IProductToSize[]> {
    try {
        const { data } = await httpService.get<IProductToSize[]>(`/shop/products/${id}/sizes`);
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
