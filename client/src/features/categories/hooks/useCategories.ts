import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    addCategoryToCollection,
    deleteCategory,
    editCategory,
    fetchAdminCategoryByPath,
    fetchGetAdminCategoriesByCollectionId,
} from "../api/categories.api";
import { ICategory } from "../types/categories.types";

export function useGetAdminCategoryByPath(collectionPath: string, categoryPath: string) {
    return useSuspenseQuery({
        queryKey: ["admin", "categories", collectionPath, categoryPath],
        queryFn: () => fetchAdminCategoryByPath(collectionPath, categoryPath),
    });
}

export function useGetAdminCategoriesByCollectionId(collectionId: string) {
    return useSuspenseQuery({
        queryKey: ["admin", "categories", collectionId],
        queryFn: () => fetchGetAdminCategoriesByCollectionId(collectionId),
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (categoryData: Omit<ICategory, "banner">) =>
            addCategoryToCollection(categoryData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["shop", "categories"] });
            queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
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
            categoryId,
            data,
        }: {
            categoryId: string;
            data: { name: string; path: string; isVisible: boolean };
        }) => editCategory(categoryId, data),
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ["shop", "categories"] });
            queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
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
        mutationFn: (categoryId: string) => deleteCategory(categoryId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["shop", "categories"] });
            queryClient.invalidateQueries({ queryKey: ["admin", "categories"] });
            toast.success(data.message);
        },
        onError: (error: any) => {
            toast.error(error?.message || "An unknown error occurred.");
        },
    });
}
