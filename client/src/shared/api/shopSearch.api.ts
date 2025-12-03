import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import { IProduct } from "@/features/products/types/products.types";
import { AxiosError } from "axios";
import { httpService } from "./httpService";

export async function fetchShopSearchData(
    searchValue: string
): Promise<Partial<{ collections: ICollection[]; categories: ICategory[]; products: IProduct[] }>> {
    try {
        const { data } = await httpService.get(`/shop/search/${searchValue}`);
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
