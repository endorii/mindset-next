import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    addCategoryToCollection,
    deleteCategory,
    editCategory,
    fetchCategoryByPath,
    fetchGetCategoriesByCollectionId,
} from "../api/categories.api";
import { ICategory } from "../types/categories.types";
import { TStatus } from "@/shared/types/types";
import { toast } from "sonner";

export function useGetCategoryByPath(collectionPath: string, categoryPath: string) {
    return useQuery({
        queryKey: ["category", collectionPath, categoryPath],
        queryFn: () => fetchCategoryByPath(collectionPath, categoryPath),
        enabled: !!collectionPath || !!categoryPath,
    });
}

export function useGetCategoriesByCollectionId(collectionId: string | undefined) {
    return useQuery({
        queryKey: ["categories", collectionId],
        queryFn: () => fetchGetCategoriesByCollectionId(collectionId || ""),
        enabled: !!collectionId,
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (categoryData: ICategory) => addCategoryToCollection(categoryData),
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
                banner: string;
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
