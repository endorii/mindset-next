import { ICategory, ICategoryPayload } from "../types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchCategoriesByCollection(
    collectionPath: ICollection["path"]
): Promise<ICategory[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/collections/${collectionPath}/categories`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка отримання категорій");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching categories:", error);
        throw new Error("Помилка отримання категорій");
    }
}

export async function fetchCategory(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"]
): Promise<ICategory> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}`
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка отримання категорії");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching category:", error);
        throw new Error("Помилка отримання категорії");
    }
}

export async function addCategoryToCollection(
    collectionPath: ICollection["path"],
    categoryData: ICategoryPayload
): Promise<ICategory> {
    try {
        const response = await fetch(`${API_BASE_URL}/collections/${collectionPath}/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(categoryData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка додавання категорії");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error adding category:", error);
        throw new Error("Помилка додавання категорії");
    }
}

export async function editCategory(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"],
    data: Partial<ICategory>
): Promise<ICategory> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка оновлення категорії");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error updating category:", error);
        throw new Error("Помилка оновлення категорії");
    }
}

export async function deleteCategory(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"]
): Promise<void> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}`,
            {
                method: "DELETE",
                credentials: "include",
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка видалення категорії");
        }
    } catch (error) {
        console.error("Fetch error deleting category:", error);
        throw new Error("Помилка видалення категорії");
    }
}
