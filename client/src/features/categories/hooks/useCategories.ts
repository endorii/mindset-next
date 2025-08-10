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

export function useGetCategoryByPath(collectionPath: string, categoryPath: string) {
    return useQuery({
        queryKey: ["category", categoryPath],
        queryFn: () => fetchCategoryByPath(collectionPath, categoryPath),
    });
}

export function useGetCategoriesByCollectionId(collectionId: string | undefined) {
    return useQuery({
        queryKey: ["categories", collectionId],
        queryFn: () => fetchGetCategoriesByCollectionId(collectionId!),
        enabled: !!collectionId,
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (categoryData: ICategory) => addCategoryToCollection(categoryData),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
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
        onSuccess() {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (categoryId: string) => deleteCategory(categoryId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["categories"],
            });
        },
    });
}
