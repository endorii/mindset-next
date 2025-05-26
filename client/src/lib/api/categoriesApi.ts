import { ICategory } from "@/types/types";

export async function fetchCategories(collectionId: string): Promise<ICategory[]> {
    try {
        const res = await fetch(`http://localhost:5000/api/categories/${collectionId}`);
        if (!res.ok) throw new Error("Помилка отримання катагорії");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
