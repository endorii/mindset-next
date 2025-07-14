import { ICollection, ICollectionPayload } from "../types/collections.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchCollections(): Promise<ICollection[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/collections`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function fetchCollection(collectionPath: string): Promise<ICollection> {
    try {
        const response = await fetch(`${API_BASE_URL}/collections/${collectionPath}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function createCollection(data: ICollectionPayload): Promise<ICollection> {
    try {
        const response = await fetch(`${API_BASE_URL}/collections`, {
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
    collectionPath: string,
    data: Partial<ICollection>
): Promise<ICollection> {
    try {
        const response = await fetch(`${API_BASE_URL}/collections/${collectionPath}`, {
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

export async function deleteCollection(collectionPath: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/collections/${collectionPath}`, {
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
