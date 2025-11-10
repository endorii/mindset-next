import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { toast } from "sonner";
import {
    addProductToCategory,
    deleteProduct,
    editProduct,
    fetchGetProductByPath,
    fetchPopularProducts,
    fetchProductsByCategoryId,
    fetchProductsByIds,
    fetchProductsFromSameCollection,
} from "../api/products.api";
import { ICreateProductPayload, IProduct } from "../types/products.types";

export function usePopularProducts() {
    return useSuspenseQuery({
        queryKey: ["popularProducts"],
        queryFn: () => fetchPopularProducts(),
    });
}

export function useProductsByCategoryId(categoryId: string | undefined) {
    return useSuspenseQuery({
        queryKey: ["products", categoryId],
        queryFn: () => fetchProductsByCategoryId(categoryId || ""),
    });
}

export function useGetProductByPath(
    collectionPath: string,
    categoryPath: string,
    productPath: string
) {
    return useQuery({
        queryKey: ["product", productPath],
        queryFn: () => fetchGetProductByPath(collectionPath, categoryPath, productPath),
        enabled: !!collectionPath || !!categoryPath || !!productPath,
    });
}

export function useProductsByIds(ids?: string[]) {
    const sortedIds = useMemo(() => (ids ? [...ids].sort() : []), [ids]);

    return useQuery<IProduct[]>({
        queryKey: ["productsByIds", sortedIds],
        queryFn: () => fetchProductsByIds(sortedIds),
        enabled: sortedIds.length > 0, // ❌ важливо
        staleTime: 1000 * 60 * 5,
    });
}

export function useProductsFromSameCollection(collectionId: string) {
    return useQuery({
        queryKey: ["products", "collection", collectionId],
        queryFn: () => fetchProductsFromSameCollection(collectionId),
        enabled: !!collectionId,
    });
}

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productData: ICreateProductPayload) => addProductToCategory(productData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            toast.success(data.message);
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("Сталася невідома помилка");
            }
        },
    });
}

export function useEditProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            productId,
            productData,
        }: {
            productId: string;
            productData: Partial<ICreateProductPayload>;
        }) => editProduct(productId, productData),
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            toast.success(data.message);
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("Сталася невідома помилка");
            }
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) => deleteProduct(productId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
            toast.success(data.message);
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("Сталася невідома помилка");
            }
        },
    });
}
