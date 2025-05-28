import { ICategory, ICollection, IProduct } from "@/types/types";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../api/products.api";

export function useProduct(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"],
    productPath: IProduct["path"]
) {
    return useQuery({
        queryKey: [
            "collections",
            collectionPath,
            "categories",
            categoryPath,
            "products",
            productPath,
        ],
        queryFn: () => fetchProduct(collectionPath, categoryPath, productPath),
    });
}
