import axios from "axios";
import { ICategory } from "@/types/category/category.types";
import { ICollection } from "@/types/collection/collection.types";
import { ICreateProductPayload, IProduct } from "@/types/product/product.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchProducts(
    collectionPath: string,
    categoryPath: string
): Promise<IProduct[]> {
    try {
        const response = await axios.get<IProduct[]>(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}/products`
        );
        return response.data;
    } catch (error) {
        console.error("Axios error fetching products:", error);
        throw new Error("Помилка отримання продуктів");
    }
}

export async function fetchProduct(
    collectionPath: string,
    categoryPath: string,
    productPath: string
): Promise<IProduct> {
    try {
        const response = await axios.get<IProduct>(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}/products/${productPath}`
        );
        return response.data;
    } catch (error) {
        console.error("Axios error fetching product:", error);
        throw new Error("Помилка отримання продукту");
    }
}

export async function addProductToCategory(
    collectionPath: string,
    categoryPath: string,
    productData: ICreateProductPayload
): Promise<IProduct> {
    try {
        const response = await axios.post<IProduct>(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}/products`,
            productData
        );
        return response.data;
    } catch (error) {
        console.error("Axios error adding product:", error);
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
        const response = await axios.patch<IProduct>(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}/products/${productPath}`,
            {
                ...productData,
                updatedAt: new Date().toISOString(),
            }
        );
        return response.data;
    } catch (error) {
        console.error("Axios error updating product:", error);
        throw new Error("Не вдалося оновити продукт");
    }
}

export async function deleteProduct(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"],
    productPath: IProduct["path"]
): Promise<void> {
    try {
        await axios.delete(
            `${API_BASE_URL}/collections/${collectionPath}/categories/${categoryPath}/products/${productPath}`
        );
    } catch (error) {
        console.error("Axios error deleting product:", error);
        throw new Error("Не вдалося видалити товар");
    }
}
