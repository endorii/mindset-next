import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import { IProduct } from "@/features/products/types/products.types";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = "http://localhost:3000";

    const collectionsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/collections`);
    const collections = await collectionsRes.json();

    const categoriesRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/categories`);
    const categories = await categoriesRes.json();

    const productsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/products`);
    const products = await productsRes.json();

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        ...collections.map((collection: ICollection) => ({
            url: `${baseUrl}/${collection.path}`,
            lastModified: new Date(collection.updatedAt ?? new Date()),
            changeFrequency: "weekly",
            priority: 0.7,
        })),
        ...categories.map((category: ICategory) => ({
            url: `${baseUrl}/${category.collection?.path}/${category.path}`,
            lastModified: new Date(category.updatedAt ?? new Date()),
            changeFrequency: "weekly",
            priority: 0.7,
        })),
        ...products.map((product: IProduct) => ({
            url: `${baseUrl}/${product.category?.collection?.path}/${product.category?.path}/${product.path}`,
            lastModified: new Date(product.updatedAt ?? new Date()),
            changeFrequency: "weekly",
            priority: 0.7,
        })),
    ];
}
