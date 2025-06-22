import axios from "axios";
import { ICollection, ICollectionPayload } from "@/types/collection/collection.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchCollections(): Promise<ICollection[]> {
    try {
        const response = await axios.get<ICollection[]>(`${API_BASE_URL}/collections`);
        return response.data;
    } catch (error) {
        console.error("Axios error fetching collections:", error);
        throw new Error("Помилка отримання колекцій");
    }
}

export async function fetchCollection(collectionPath: string): Promise<ICollection> {
    try {
        const response = await axios.get<ICollection>(
            `${API_BASE_URL}/collections/${collectionPath}`
        );
        return response.data;
    } catch (error) {
        console.error("Axios error fetching collection:", error);
        throw new Error("Помилка отримання колекції");
    }
}

export async function createCollection(data: ICollectionPayload): Promise<ICollection> {
    try {
        const response = await axios.post<{ message: string; collection: ICollection }>(
            `${API_BASE_URL}/collections`,
            data
        );

        console.log(response.data.message);

        return response.data.collection;
    } catch (error) {
        console.error("Axios error creating collection:", error);
        throw new Error("Помилка створення колекції");
    }
}

export async function editCollection(
    collectionPath: string,
    data: Partial<ICollection>
): Promise<ICollection> {
    try {
        const response = await axios.patch<ICollection>(
            `${API_BASE_URL}/collections/${collectionPath}`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Axios error updating collection:", error);
        throw new Error("Не вдалося оновити колекцію");
    }
}

export async function deleteCollection(collectionPath: string): Promise<void> {
    try {
        await axios.delete(`${API_BASE_URL}/collections/${collectionPath}`);
    } catch (error) {
        console.error("Axios error deleting collection:", error);
        throw new Error("Не вдалося видалити колекцію");
    }
}
