import { httpService, httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { IOrder } from "../types/orders.types";

export async function getOrders(): Promise<IOrder[]> {
    try {
        const { data } = await httpServiceAuth.get("/admin/orders");
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function getOrdersByUserId(): Promise<IOrder[]> {
    try {
        const { data } = await httpServiceAuth.get("/shop/orders/users");
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function createOrder(payload: IOrder): Promise<ServerResponseWithMessage<IOrder>> {
    try {
        const { data } = await httpService.post("/shop/orders", payload);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function updateOrder(
    orderId: string | undefined,
    payload: Partial<IOrder>
): Promise<ServerResponseWithMessage<IOrder>> {
    try {
        const { data } = await httpServiceAuth.patch(`/admin/orders/${orderId}`, payload);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function deleteOrder(orderId: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.delete(`/admin/orders/${orderId}`);
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
