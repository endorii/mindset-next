import axios from "axios";
import { ISize, ISizePayload } from "@/types/size/size.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchSizes(): Promise<ISize[]> {
    try {
        const response = await axios.get<ISize[]>(`${API_BASE_URL}/sizes`);
        return response.data;
    } catch (error) {
        console.error("Axios error fetching sizes:", error);
        throw new Error("Помилка отримання розмірів");
    }
}

export async function createSize(data: ISizePayload): Promise<ISize> {
    try {
        const response = await axios.post<{ message: string; size: ISize }>(
            `${API_BASE_URL}/sizes`,
            data
        );
        console.log(response.data.message);
        return response.data.size;
    } catch (error) {
        console.error("Axios error creating size:", error);
        throw new Error("Помилка створення розміру");
    }
}

export async function editSize(sizeId: ISize["id"], data: Partial<ISize>): Promise<ISize> {
    try {
        const response = await axios.patch<ISize>(`${API_BASE_URL}/sizes/${sizeId}`, data);
        return response.data;
    } catch (error) {
        console.error("Axios error updating size:", error);
        throw new Error("Не вдалося оновити розмір");
    }
}

export async function deleteSize(sizeId: ISize["id"]): Promise<void> {
    try {
        await axios.delete(`${API_BASE_URL}/sizes/${sizeId}`);
    } catch (error) {
        console.error("Axios error deleting size:", error);
        throw new Error("Не вдалося видалити розмір");
    }
}
