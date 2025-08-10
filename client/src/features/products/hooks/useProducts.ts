import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
    fetchPopularProducts,
    fetchProductsFromSameCollection,
    addProductToCategory,
    editProduct,
    deleteProduct,
    fetchProductsByCategoryId,
    fetchGetProductByPath,
} from "../api/products.api";
import { IProduct, ICreateProductPayload } from "../types/products.types";

export function usePopularProducts() {
    return useQuery({
        queryKey: ["popularProducts"],
        queryFn: () => fetchPopularProducts(),
    });
}

export function useProductsByCategoryId(categoryId: string | undefined) {
    return useQuery({
        queryKey: ["products", categoryId],
        queryFn: () => fetchProductsByCategoryId(categoryId!),
        enabled: !!categoryId,
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
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
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
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) => deleteProduct(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["products"],
            });
        },
    });
}
