import axios from "axios";
import { IColor, IColorPayload } from "@/types/color/color.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchColors(): Promise<IColor[]> {
    try {
        const response = await axios.get<IColor[]>(`${API_BASE_URL}/colors`);
        return response.data;
    } catch (error) {
        console.error("Axios error fetching colors:", error);
        throw new Error("Помилка отримання кольорів");
    }
}

export async function createColor(data: IColorPayload): Promise<IColor> {
    try {
        const response = await axios.post<{ message: string; color: IColor }>(
            `${API_BASE_URL}/colors`,
            data
        );
        console.log(response.data.message);
        return response.data.color;
    } catch (error) {
        console.error("Axios error creating color:", error);
        throw new Error("Помилка створення кольору");
    }
}

export async function editColor(colorId: IColor["id"], data: Partial<IColor>): Promise<IColor> {
    try {
        const response = await axios.patch<IColor>(`${API_BASE_URL}/colors/${colorId}`, data);
        return response.data;
    } catch (error) {
        console.error("Axios error updating color:", error);
        throw new Error("Не вдалося оновити колір");
    }
}

export async function deleteColor(colorId: IColor["id"]): Promise<void> {
    try {
        await axios.delete(`${API_BASE_URL}/colors/${colorId}`);
    } catch (error) {
        console.error("Axios error deleting color:", error);
        throw new Error("Не вдалося видалити колір");
    }
}
