import { ICategory, ICollection, IProduct } from "@/types/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addProductToCategory, deleteProduct, fetchProduct } from "../api/products.api";

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

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            collectionPath,
            categoryPath,
            productData,
        }: {
            collectionPath: ICollection["path"];
            categoryPath: ICategory["path"];
            productData: IProduct;
        }) => addProductToCategory(collectionPath, categoryPath, productData),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: [
                    "collections",
                    variables.collectionPath,
                    "categories",
                    variables.categoryPath,
                ],
            });
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            collectionPath,
            categoryPath,
            productPath,
        }: {
            collectionPath: ICollection["path"];
            categoryPath: ICategory["path"];
            productPath: IProduct["path"];
        }) => deleteProduct(collectionPath, categoryPath, productPath),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: [
                    "collections",
                    variables.collectionPath,
                    "categories",
                    variables.categoryPath,
                ],
            });
        },
    });
}
