import { ICollection } from "@/types/types";

export async function fetchCollections(): Promise<ICollection[]> {
    try {
        const res = await fetch("http://localhost:5000/api/collections");
        if (!res.ok) throw new Error("Помилка отримання даних");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

export async function fetchCategoriesFromCollectionByPath(
    collectionPath: string
): Promise<ICollection> {
    try {
        const res = await fetch(`http://localhost:5000/api/collections/${collectionPath}`);
        if (!res.ok) throw new Error("Помилка отримання колекції");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
