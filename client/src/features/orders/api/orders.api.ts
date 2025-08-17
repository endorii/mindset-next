import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { IOrder } from "../types/orders.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function getOrders(): Promise<IOrder[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/orders`, {
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function getOrdersByUserId(): Promise<IOrder[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/orders/users`, {
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function createOrder(data: IOrder): Promise<ServerResponseWithMessage<IOrder>> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // credentials: "include",
            body: JSON.stringify(data),
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function updateOrder(
    orderId: string | undefined,
    data: Partial<IOrder>
): Promise<ServerResponseWithMessage<IOrder>> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function deleteOrder(orderId: string): Promise<ServerResponseWithMessage> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/orders/${orderId}`, {
            method: "DELETE",
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}
