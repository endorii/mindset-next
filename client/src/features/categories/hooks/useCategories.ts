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

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (categoryData: ICategory) => addCategoryToCollection(categoryData),
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

export function useAdminCategoryProducts(categoryId: string) {
    return useSuspenseQuery({
        queryKey: ["admin", "categories", categoryId, "products"],
        queryFn: () => fetchCategoryProducts(categoryId),
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
