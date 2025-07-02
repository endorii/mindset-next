import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    addProductToCategory,
    deleteProduct,
    editProduct,
    fetchProduct,
} from "../api/products.api";
import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import { IProduct, ICreateProductPayload } from "../types/products.types";

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
            productData: ICreateProductPayload;
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

export function useEditProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            collectionPath,
            categoryPath,
            productPath,
            productData,
        }: {
            collectionPath: ICollection["path"];
            categoryPath: ICategory["path"];
            productPath: IProduct["path"];
            productData: Partial<ICreateProductPayload>;
        }) => editProduct(collectionPath, categoryPath, productPath, productData),
        onSuccess(_data, variables) {
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
