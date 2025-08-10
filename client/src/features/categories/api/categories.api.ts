import { ICategory } from "../types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchCategoryByPath(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"]
): Promise<ICategory> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/shop/categories/${collectionPath}/${categoryPath}`
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

export async function fetchGetCategoriesByCollectionId(collectionId: string): Promise<ICategory[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/categories/${collectionId}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function addCategoryToCollection(categoryData: ICategory): Promise<ICategory> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/categories`, {
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
    categoryId: string,
    data: Partial<ICategory>
): Promise<ICategory> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/categories/${categoryId}`, {
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

export async function deleteCategory(categoryId: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/categories/${categoryId}`, {
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
