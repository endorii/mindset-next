import { IUser } from "../types/user.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchUser(email: string): Promise<IUser> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${email}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка отримання користувача");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching user:", error);
        throw new Error("Помилка отримання користувача");
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
            throw new Error(errorData.message || "Не вдалося оновити дані про користувача");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error updating user:", error);
        throw new Error("Не вдалося оновити дані про користувача");
    }
}
