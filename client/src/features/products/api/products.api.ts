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
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}/products`
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка отримання товарів");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching products:", error);
        throw new Error("Помилка отримання товарів");
    }
}

export async function fetchProduct(
    collectionPath: string,
    categoryPath: string,
    productPath: string
): Promise<IProduct> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}/products/${productPath}`
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка отримання товару");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching product:", error);
        throw new Error("Помилка отримання товару");
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
            throw new Error(errorData.message || "Помилка додавання товару");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error adding product:", error);
        throw new Error("Помилка додавання товару");
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
            throw new Error(errorData.message || "Не вдалося оновити товар");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error updating product:", error);
        throw new Error("Не вдалося оновити товар");
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
            throw new Error(errorData.message || "Не вдалося видалити товар");
        }
    } catch (error) {
        console.error("Fetch error deleting product:", error);
        throw new Error("Не вдалося видалити товар");
    }
}
