import { ICategory, ICollection, IProduct } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProductToCategory, fetchProduct } from "../api/products.api";

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

export function useCreateProduct(
    collectionPath: ICollection["path"],
    categoryPath: ICategory["path"]
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productData: IProduct) =>
            addProductToCategory(collectionPath, categoryPath, productData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["collections", collectionPath, "categories", categoryPath],
            });
        },
    });
}
