import { httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { IFavoriteItem } from "../types/favorites.types";

export async function fetchFavoritesFromUser(): Promise<IFavoriteItem[]> {
    try {
        const { data } = await httpServiceAuth.get("/shop/favorites");
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function addFavoriteToUser(productId: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.post("/shop/favorites", { productId });
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function deleteFavoriteFromUser(
    productId: string
): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.delete(`/shop/favorites/${productId}`);
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
