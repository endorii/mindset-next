import { ICategory } from "@/types/types";

export async function fetchCategoriesByCollection(collectionPath: string): Promise<ICategory[]> {
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
    collectionPath: string,
    categoryPath: string
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

// export async function addCategoryToCollection(
//     collectionPath: string,
//     categoryData: any //заглушка
// ): Promise<ICategory> {
//     try {
//         const res = await fetch(
//             `http://localhost:5000/api/collections/${collectionPath}/categories`,
//             {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(categoryData),
//             }
//         );
//         if (!res.ok) throw new Error("Помилка додавання категорії");
//         return res.json();
//     } catch (error) {
//         console.error("Fetch error:", error);
//         throw error;
//     }
// }

// export async function deleteCategory(collectionPath: string, categoryPath: string): Promise<void> {
//     try {
//         const res = await fetch(
//             `http://localhost:5000/api/collections/${collectionPath}/categories/${categoryPath}`,
//             {
//                 method: "DELETE",
//             }
//         );
//         if (!res.ok) throw new Error("Помилка видалення категорії");
//     } catch (error) {
//         console.error("Fetch error:", error);
//         throw error;
//     }
// }
