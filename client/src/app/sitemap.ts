import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import { IProduct } from "@/features/products/types/products.types";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    // Initialize empty arrays for fallback
    let collections: ICollection[] = [];
    let categories: ICategory[] = [];
    let products: IProduct[] = [];

    try {
        // Fetch collections
        const collectionsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/collections`, {
            next: { revalidate: 3600 },
        });
        if (collectionsRes.ok) {
            collections = await collectionsRes.json();
        }
    } catch (error) {
        console.warn("Could not fetch collections for sitemap:", error);
    }

    try {
        // Fetch categories
        const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/categories`, {
            next: { revalidate: 3600 },
        });
        if (categoriesRes.ok) {
            categories = await categoriesRes.json();
        }
    } catch (error) {
        console.warn("Could not fetch categories for sitemap:", error);
    }

    try {
        // Fetch products
        const productsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/products`, {
            next: { revalidate: 3600 },
        });
        if (productsRes.ok) {
            products = await productsRes.json();
        }
    } catch (error) {
        console.warn("Could not fetch products for sitemap:", error);
    }

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly" as const,
            priority: 1,
        },
        ...collections.map((collection: ICollection) => ({
            url: `${baseUrl}/${collection.path}`,
            lastModified: new Date(collection.updatedAt ?? new Date()),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        })),
        ...categories.map((category: ICategory) => ({
            url: `${baseUrl}/${category.collection?.path}/${category.path}`,
            lastModified: new Date(category.updatedAt ?? new Date()),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        })),
        ...products.map((product: IProduct) => ({
            url: `${baseUrl}/${product.category?.collection?.path}/${product.category?.path}/${product.path}`,
            lastModified: new Date(product.updatedAt ?? new Date()),
            changeFrequency: "weekly" as const,
            priority: 0.7,
        })),
    ];
}
