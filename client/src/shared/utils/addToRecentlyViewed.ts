import { IProduct } from "@/features/products/types/products.types";

export default function addToRecentlyViewed(product: IProduct) {
    const key = "recentlyViewed";
    const existing = JSON.parse(localStorage.getItem(key) || "[]");

    const filtered = existing.filter((p: IProduct) => p.id !== product.id);

    const updated = [product, ...filtered].slice(0, 20);

    localStorage.setItem(key, JSON.stringify(updated));
}
