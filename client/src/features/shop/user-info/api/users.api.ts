import { httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { AxiosError } from "axios";
import { IUser } from "../types/user.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function editUser(payload: Partial<IUser>): Promise<ServerResponseWithMessage<IUser>> {
    try {
        const { data } = await httpServiceAuth.patch(`${API_BASE_URL}/shop/users`, payload);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function deleteUser(password: string): Promise<ServerResponseWithMessage> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/users`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),

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

export async function changePassword(data: {
    oldPassword: string;
    newPassword: string;
}): Promise<ServerResponseWithMessage> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/users/change-password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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
