import { IUser } from "../types/user.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function editUser(data: Partial<IUser>): Promise<IUser> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/users`, {
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

export async function deleteUser(password: string): Promise<IUser> {
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
}): Promise<IUser> {
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
