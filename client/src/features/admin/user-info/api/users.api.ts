import { IUser } from "../types/user.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchUser(email: string): Promise<IUser> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${email}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function editUser(id: string, data: Partial<IUser>): Promise<IUser> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function changePassword(data: {
    oldPassword: string;
    newPassword: string;
}): Promise<IUser> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/change-password`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function deleteUser(password: string): Promise<IUser> {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),

            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}
