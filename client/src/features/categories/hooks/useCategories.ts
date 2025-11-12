import { TStatus } from "@/shared/types/types";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    addCategoryToCollection,
    deleteCategory,
    editCategory,
    fetchCategoryByPath,
    fetchGetCategoriesByCollectionId,
} from "../api/categories.api";
import { ICategory } from "../types/categories.types";

export function useGetCategoryByPath(collectionPath: string, categoryPath: string) {
    return useSuspenseQuery({
        queryKey: ["category", collectionPath, categoryPath],
        queryFn: () => fetchCategoryByPath(collectionPath, categoryPath),
    });
}

export function useGetCategoriesByCollectionId(collectionId: string | undefined) {
    return useSuspenseQuery({
        queryKey: ["categories", collectionId],
        queryFn: () => fetchGetCategoriesByCollectionId(collectionId || ""),
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (categoryData: Omit<ICategory, "banner">) =>
            addCategoryToCollection(categoryData),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
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

export function useEditCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            categoryId,
            data,
        }: {
            categoryId: string;
            data: {
                name: string;
                path: string;
                status: TStatus;
            };
        }) => editCategory(categoryId, data),
        onSuccess(data) {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
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

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (categoryId: string) => deleteCategory(categoryId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
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
