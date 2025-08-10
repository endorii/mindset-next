import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import { IProduct, ICreateProductPayload } from "../types/products.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchProductsByCategoryId(categoryId: string): Promise<IProduct[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/products/categories/${categoryId}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function fetchGetProductByPath(
    collectionPath: string,
    categoryPath: string,
    productPath: string
): Promise<IProduct> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/shop/products/${collectionPath}/${categoryPath}/${productPath}`
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

export async function fetchPopularProducts(): Promise<IProduct[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/products/popular`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function fetchProductsFromSameCollection(collectionPath: string): Promise<IProduct[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/products/collections/${collectionPath}`);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}

export async function addProductToCategory(productData: ICreateProductPayload): Promise<IProduct> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/products`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(productData),
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

export async function editProduct(
    productId: string,
    productData: Partial<ICreateProductPayload>
): Promise<IProduct> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/products/${productId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(productData),
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

export async function deleteProduct(productId: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/products/${productId}`, {
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
