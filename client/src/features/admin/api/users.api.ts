import { IUser } from "../user-info/types/user.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchAllUsers(): Promise<IUser[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/users`, {
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
