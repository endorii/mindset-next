import { fetchCategoryProducts } from "@/features/products/api/products.api";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    addCategoryToCollection,
    deleteCategory,
    editCategory,
    fetchAdminCategory,
} from "../api/categories.api";
import { ICategory } from "../types/categories.types";

export function useAdminCategory(categoryId: string) {
    return useSuspenseQuery({
        queryKey: ["admin", "categories", categoryId],
        queryFn: () => fetchAdminCategory(categoryId),
    });
}

export function useAdminCategoryProducts(categoryId: string) {
    return useSuspenseQuery({
        queryKey: ["admin", "categories", categoryId, "products"],
        queryFn: () => fetchCategoryProducts(categoryId),
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (categoryData: ICategory) => addCategoryToCollection(categoryData),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["shop", "collections", variables.collectionId, "categories"],
            });
            queryClient.invalidateQueries({
                queryKey: ["admin", "collections", variables.collectionId, "categories"],
            });

            toast.success(data.message);
        },
        onError: (error: any) => {
            toast.error(error?.message || "An unknown error occurred.");
        },
    });
}

export function useEditCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            collectionId,
            categoryId,
            data,
        }: {
            categoryId: string;
            collectionId: string;
            data: { name: string; path: string; isVisible: boolean };
        }) => editCategory(categoryId, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["shop", "collections", variables.collectionId, "categories"],
            });
            queryClient.invalidateQueries({
                queryKey: ["admin", "collections", variables.collectionId, "categories"],
            });
            toast.success(data.message);
        },

        onError: (error: any) => {
            toast.error(error?.message || "An unknown error occurred.");
        },
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ collectionId, categoryId }: { collectionId: string; categoryId: string }) =>
            deleteCategory(categoryId),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["shop", "collections", variables.collectionId, "categories"],
            });
            queryClient.invalidateQueries({
                queryKey: ["admin", "collections", variables.collectionId, "categories"],
            });
            toast.success(data.message);
        },
        onError: (error: any) => {
            toast.error(error?.message || "An unknown error occurred.");
        },
    });
}
