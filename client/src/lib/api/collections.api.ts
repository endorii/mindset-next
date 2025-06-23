import { ICollection, ICollectionPayload } from "@/types/collection/collection.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchCollections(): Promise<ICollection[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/collections`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка отримання колекцій");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching collections:", error);
        throw new Error("Помилка отримання колекцій");
    }
}

export async function fetchCollection(collectionPath: string): Promise<ICollection> {
    try {
        const response = await fetch(`${API_BASE_URL}/collections/${collectionPath}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка отримання колекції");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching collection:", error);
        throw new Error("Помилка отримання колекції");
    }
}

export async function createCollection(data: ICollectionPayload): Promise<ICollection> {
    try {
        const response = await fetch(`${API_BASE_URL}/collections`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка створення колекції");
        }

        const result = await response.json();
        console.log(result.message);

        return result.collection;
    } catch (error) {
        console.error("Fetch error creating collection:", error);
        throw new Error("Помилка створення колекції");
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
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Не вдалося оновити колекцію");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error updating collection:", error);
        throw new Error("Не вдалося оновити колекцію");
    }
}

export async function deleteCollection(collectionPath: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/collections/${collectionPath}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Не вдалося видалити колекцію");
        }
    } catch (error) {
        console.error("Fetch error deleting collection:", error);
        throw new Error("Не вдалося видалити колекцію");
    }
}
