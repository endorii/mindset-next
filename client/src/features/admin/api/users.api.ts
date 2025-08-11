import { IUser } from "@/features/shop/user-info/types/user.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchAllUsers(): Promise<IUser[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/users`, {
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
