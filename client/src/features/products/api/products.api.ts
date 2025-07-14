import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import { IProduct, ICreateProductPayload } from "../types/products.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchProducts(
    collectionPath: string,
    categoryPath: string
): Promise<IProduct[]> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}/products`,
            { credentials: "include" }
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

export async function fetchProduct(
    collectionPath: string,
    categoryPath: string,
    productPath: string
): Promise<IProduct> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}/products/${productPath}`,
            {
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

export async function addProductToCategory(
    collectionPath: string,
    categoryPath: string,
    productData: ICreateProductPayload
): Promise<IProduct> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}/products`,
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
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

export async function editProduct(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"],
    productPath: IProduct["path"],
    productData: Partial<ICreateProductPayload>
): Promise<IProduct> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}/products/${productPath}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    ...productData,
                    updatedAt: new Date().toISOString(),
                }),
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

export async function deleteProduct(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"],
    productPath: IProduct["path"]
): Promise<void> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}/products/${productPath}`,
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
