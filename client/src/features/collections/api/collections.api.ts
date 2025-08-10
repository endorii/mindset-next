import { ICollection } from "../types/collections.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchCollections(): Promise<ICollection[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/collections`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function fetchGetCollectionByPath(collectionPath: string): Promise<ICollection> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/collections/${collectionPath}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function createCollection(data: ICollection): Promise<ICollection> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/collections`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
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

export async function editCollection(
    collectionId: string,
    data: Partial<ICollection>
): Promise<ICollection> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/collections/${collectionId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
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

export async function deleteCollection(collectionId: string): Promise<ICollection> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/collections/${collectionId}`, {
            method: "DELETE",
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
