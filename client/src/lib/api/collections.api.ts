import { ICollection, TStatus } from "@/types/types";

export async function fetchCollections(): Promise<ICollection[]> {
    try {
        const res = await fetch("http://localhost:5000/api/collections");
        if (!res.ok) throw new Error("Помилка отримання колекцій");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function fetchCollection(collectionPath: string): Promise<ICollection> {
    try {
        const res = await fetch(`http://localhost:5000/api/collections/${collectionPath}`);
        if (!res.ok) throw new Error("Помилка отримання колекції");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function createCollection(data: {
    name: string;
    path: string;
    banner: string;
    views: number;
    status: string;
}): Promise<ICollection> {
    try {
        const res = await fetch("http://localhost:5000/api/collections", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Помилка створення колекції");
        const response = await res.json();

        console.log(response.message);

        return response.collection;
    } catch (error) {
        console.error("Create collection error:", error);
        throw error;
    }
}

export async function editCollection(
    collectionPath: string,
    data: { name: string; path: string; status: TStatus; banner: string }
) {
    const res = await fetch(`http://localhost:5000/api/collections/${collectionPath}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        throw new Error("Не вдалося оновити колекцію");
    }

    return res.json();
}

export async function deleteCollection(collectionPath: string) {
    const res = await fetch(`http://localhost:5000/api/collections/${collectionPath}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Не вдалося видалити колекцію");
    }

    return res.json();
}
