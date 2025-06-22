import axios from "axios";
import { ICategory, ICategoryPayload } from "@/types/category/category.types";
import { ICollection } from "@/types/collection/collection.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchCategoriesByCollection(
    collectionPath: ICollection["path"]
): Promise<ICategory[]> {
    try {
        const response = await axios.get<ICategory[]>(
            `${API_BASE_URL}/collections/${collectionPath}/categories`
        );
        return response.data;
    } catch (error) {
        console.error("Axios error fetching categories:", error);
        throw new Error("Помилка отримання категорій");
    }
}

export async function fetchCategory(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"]
): Promise<ICategory> {
    try {
        const response = await axios.get<ICategory>(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}`
        );
        return response.data;
    } catch (error) {
        console.error("Axios error fetching category:", error);
        throw new Error("Помилка отримання категорій");
    }
}

export async function addCategoryToCollection(
    collectionPath: ICollection["path"],
    categoryData: ICategoryPayload
): Promise<ICategory> {
    try {
        const response = await axios.post<ICategory>(
            `${API_BASE_URL}/collections/${collectionPath}/categories`,
            categoryData
        );
        return response.data;
    } catch (error) {
        console.error("Axios error adding category:", error);
        throw new Error("Помилка додавання категорії");
    }
}

export async function editCategory(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"],
    data: Partial<ICategory>
): Promise<ICategory> {
    try {
        const response = await axios.patch<ICategory>(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Axios error updating category:", error);
        throw new Error("Не вдалося оновити колекцію");
    }
}

export async function deleteCategory(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"]
): Promise<void> {
    // Assuming delete usually returns no content or a success message
    try {
        await axios.delete(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}`
        );
    } catch (error) {
        console.error("Axios error deleting category:", error);
        throw new Error("Не вдалося видалити категорію");
    }
}
