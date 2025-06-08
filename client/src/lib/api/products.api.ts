import { ICategory, ICollection, IProduct } from "@/types/types";

export async function fetchProducts(
    collectionPath: string,
    categoryPath: string
): Promise<IProduct[]> {
    try {
        const res = await fetch(
            `http://localhost:5000/api/collections/${collectionPath}/categories/${categoryPath}/products`
        );
        if (!res.ok) throw new Error("Помилка отримання продуктів");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function fetchProduct(
    collectionPath: string,
    categoryPath: string,
    productPath: string
): Promise<IProduct> {
    try {
        const res = await fetch(
            `http://localhost:5000/api/collections/${collectionPath}/categories/${categoryPath}/products/${productPath}`
        );
        if (!res.ok) throw new Error("Помилка отримання продукту");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function addProductToCategory(
    collectionPath: string,
    categoryPath: string,
    productData: IProduct
): Promise<IProduct> {
    try {
        const res = await fetch(
            `http://localhost:5000/api/collections/${collectionPath}/categories/${categoryPath}/products`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productData),
            }
        );
        if (!res.ok) throw new Error("Помилка отримання продукту");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function deleteProduct(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"],
    productPath: IProduct["path"]
) {
    const res = await fetch(
        `http://localhost:5000/api/collections/${collectionPath}/categories/${categoryPath}/products/${productPath}`,
        {
            method: "DELETE",
        }
    );

    if (!res.ok) {
        throw new Error("Не вдалося видалити товар");
    }

    return res.json();
}
