import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    addProductToCategory,
    deleteProduct,
    editProduct,
    fetchGetProductByPath,
    fetchPopularProducts,
    fetchProductColors,
    fetchProductsByIds,
    fetchProductsFromSameCollection,
    fetchProductSizes,
    fetchProductTypes,
} from "../api/products.api";
import { ICreateProductPayload } from "../types/products.types";

export function usePopularProducts() {
    return useSuspenseQuery({
        queryKey: ["shop", "products", "popular"],
        queryFn: () => fetchPopularProducts(),
    });
}

export function useProductByPath(
    collectionPath: string,
    categoryPath: string,
    productPath: string
) {
    return useQuery({
        queryKey: ["shop", "products", productPath],
        queryFn: () => fetchGetProductByPath(collectionPath, categoryPath, productPath),
        enabled: !!collectionPath || !!categoryPath || !!productPath,
    });
}

export function useProductsByIds(ids: string[]) {
    const nonEmptyIds = ids.filter(Boolean);
    return useQuery({
        queryKey: ["shop", "products", "by-ids", nonEmptyIds],
        queryFn: () => fetchProductsByIds(nonEmptyIds),
    });
}

export function useProductsFromSameCollection(collectionId: string) {
    return useQuery({
        queryKey: ["shop", "products", "collection", collectionId],
        queryFn: () => fetchProductsFromSameCollection(collectionId),
        enabled: !!collectionId,
    });
}

export function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (payload: ICreateProductPayload) => addProductToCategory(payload),

        onSuccess(data, variables) {
            // refresh category products
            queryClient.invalidateQueries({
                queryKey: ["admin", "categories", variables.categoryId, "products"],
            });

            // refresh shop lists
            queryClient.invalidateQueries({ queryKey: ["shop", "products"] });
            queryClient.invalidateQueries({ queryKey: ["shop", "products", "popular"] });

            toast.success(data.message);
        },

        onError(error: any) {
            toast.error(error?.message ?? "Unknown error");
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

        onSuccess(data, variables) {
            const id = variables.productId;

            // refresh product detail
            queryClient.invalidateQueries({ queryKey: ["products", id] });
            queryClient.invalidateQueries({ queryKey: ["products", id, "colors"] });
            queryClient.invalidateQueries({ queryKey: ["products", id, "sizes"] });
            queryClient.invalidateQueries({ queryKey: ["products", id, "types"] });

            // refresh lists
            queryClient.invalidateQueries({ queryKey: ["admin", "products"] });
            queryClient.invalidateQueries({ queryKey: ["shop", "products"] });
            queryClient.invalidateQueries({ queryKey: ["shop", "products", "popular"] });

            toast.success(data.message);
        },

        onError(error: any) {
            toast.error(error?.message ?? "Unknown error");
        },
    });
}

export function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) => deleteProduct(productId),

        onSuccess(data) {
            // refresh admin lists
            queryClient.invalidateQueries({ queryKey: ["admin", "products"] });

            // refresh shop lists
            queryClient.invalidateQueries({ queryKey: ["shop", "products"] });
            queryClient.invalidateQueries({ queryKey: ["shop", "products", "popular"] });

            toast.success(data.message);
        },

        onError(error: any) {
            toast.error(error?.message ?? "Unknown error");
        },
    });
}
export function useProductColors(id: string) {
    return useQuery({
        queryKey: ["products", id, "colors"],
        queryFn: () => fetchProductColors(id),
    });
}

export function useProductTypes(id: string) {
    return useQuery({
        queryKey: ["products", id, "types"],
        queryFn: () => fetchProductTypes(id),
    });
}

export function useProductSizes(id: string) {
    return useQuery({
        queryKey: ["products", id, "sizes"],
        queryFn: () => fetchProductSizes(id),
    });
}
