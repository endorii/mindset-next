import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
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

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function fetchGetCategoriesByCollectionId(collectionId: string): Promise<ICategory[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/categories/${collectionId}`);

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function addCategoryToCollection(
    categoryData: ICategory
): Promise<ServerResponseWithMessage<ICategory>> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/categories`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(categoryData),
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function editCategory(
    categoryId: string,
    data: Partial<ICategory>
): Promise<ServerResponseWithMessage<ICategory>> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/categories/${categoryId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function deleteCategory(categoryId: string): Promise<ServerResponseWithMessage> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/categories/${categoryId}`, {
            method: "DELETE",
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}
