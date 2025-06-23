import { ICategory } from "@/types/category/category.types";
import { ICollection } from "@/types/collection/collection.types";
import { ICreateProductPayload, IProduct } from "@/types/product/product.types";

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
            throw new Error(errorData.message || "Помилка отримання продуктів");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching products:", error);
        throw new Error("Помилка отримання продуктів");
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
            throw new Error(errorData.message || "Помилка отримання продукту");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error fetching product:", error);
        throw new Error("Помилка отримання продукту");
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
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка додавання продукту");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error adding product:", error);
        throw new Error("Помилка додавання продукту");
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
                body: JSON.stringify({
                    ...productData,
                    updatedAt: new Date().toISOString(),
                }),
            }
        );

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Не вдалося оновити продукт");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error updating product:", error);
        throw new Error("Не вдалося оновити продукт");
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
