import { ICategory } from "../types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchCategoriesByCollection(
    collectionPath: ICollection["path"]
): Promise<ICategory[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/collections/${collectionPath}/categories`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
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
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function addCategoryToCollection(
    collectionPath: ICollection["path"],
    categoryData: ICategory
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
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
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
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
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
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}
