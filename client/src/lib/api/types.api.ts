import axios from "axios";
import { IType, ITypePayload } from "@/types/type/type.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchTypes(): Promise<IType[]> {
    try {
        const response = await axios.get<IType[]>(`${API_BASE_URL}/types`);
        return response.data;
    } catch (error) {
        console.error("Axios error fetching types:", error);
        throw new Error("Помилка отримання типів");
    }
}

export async function createType(data: ITypePayload): Promise<IType> {
    try {
        const response = await axios.post<{ message: string; type: IType }>(
            `${API_BASE_URL}/types`,
            data
        );
        console.log(response.data.message);
        return response.data.type;
    } catch (error) {
        console.error("Axios error creating type:", error);
        throw new Error("Помилка створення типу");
    }
}

export async function editType(typeId: IType["id"], data: Partial<IType>): Promise<IType> {
    try {
        const response = await axios.patch<IType>(`${API_BASE_URL}/types/${typeId}`, data);
        return response.data;
    } catch (error) {
        console.error("Axios error updating type:", error);
        throw new Error("Не вдалося оновити тип");
    }
}

export async function deleteType(typeId: IType["id"]): Promise<void> {
    try {
        await axios.delete(`${API_BASE_URL}/types/${typeId}`);
    } catch (error) {
        console.error("Axios error deleting type:", error);
        throw new Error("Не вдалося видалити тип");
    }
}
