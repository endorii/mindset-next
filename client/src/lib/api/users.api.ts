import axios from "axios";
import { IUser } from "@/types/user/user.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchUser(email: string): Promise<IUser> {
    try {
        const response = await axios.get<IUser>(`${API_BASE_URL}/users/${email}`);
        return response.data;
    } catch (error) {
        console.error("Axios error fetching user:", error);
        throw new Error("Помилка отримання юзера");
    }
}

export async function editUser(id: string, data: Partial<IUser>): Promise<IUser> {
    try {
        const response = await axios.patch<IUser>(`${API_BASE_URL}/users/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Axios error updating user:", error);
        throw new Error("Не вдалося оновити дані про юзера");
    }
}
