import { httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { ICartItem } from "../types/cart.types";

export async function fetchAllCartItemsFromUser(): Promise<ICartItem[]> {
    try {
        const { data } = await httpServiceAuth.get("/shop/cart");
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function addCartItemToUser(
    cartItem: ICartItem
): Promise<ServerResponseWithMessage<ICartItem>> {
    try {
        const { data } = await httpServiceAuth.post("/shop/cart", cartItem);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function deleteCartItemFromUser(
    cartItemId: string
): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.delete(`/shop/cart/${cartItemId}`);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function deleteCartFromUser(): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.delete("/shop/cart");
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
