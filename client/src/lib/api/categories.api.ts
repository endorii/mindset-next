import { ICategory, ICategoryPayload } from "@/types/category/category.types";
import { ICollection } from "@/types/collection/collection.types";

export async function fetchCategoriesByCollection(
    collectionPath: ICollection["path"]
): Promise<ICategory[]> {
    try {
        const res = await fetch(
            `http://localhost:5000/api/collections/${collectionPath}/categories`
        );
        if (!res.ok) throw new Error("Помилка отримання категорій");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function fetchCategory(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"]
): Promise<ICategory> {
    try {
        const res = await fetch(
            `http://localhost:5000/api/collections/${collectionPath}/categories/${categoryPath}`
        );
        if (!res.ok) throw new Error("Помилка отримання категорій");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function addCategoryToCollection(
    collectionPath: ICollection["path"],
    categoryData: ICategoryPayload
): Promise<ICategory> {
    try {
        const res = await fetch(
            `http://localhost:5000/api/collections/${collectionPath}/categories`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(categoryData),
            }
        );
        if (!res.ok) throw new Error("Помилка додавання категорії");
        return res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}

export async function editCategory(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"],
    data: Partial<ICategory>
) {
    const res = await fetch(
        `http://localhost:5000/api/collections/${collectionPath}/categories/${categoryPath}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    if (!res.ok) {
        throw new Error("Не вдалося оновити колекцію");
    }

    return res.json();
}

export async function deleteCategory(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"]
) {
    const res = await fetch(
        `http://localhost:5000/api/collections/${collectionPath}/categories/${categoryPath}`,
        {
            method: "DELETE",
        }
    );

    if (!res.ok) {
        throw new Error("Не вдалося видалити категорію");
    }

    return res.json();
}
