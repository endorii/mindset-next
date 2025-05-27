import { IProduct } from "@/types/types";

export async function fetchProductsByCategory(
    collectionPath: string,
    categoryPath: string
): Promise<IProduct[]> {
    try {
        const res = await fetch(
            `http://localhost:5000/api/collections/${collectionPath}/categories/${categoryPath}/products`
        );
        if (!res.ok) throw new Error("Помилка отримання продуктів");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
