import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ICategory, ICollection } from "@/types/types";
import { addCategoryToCollection, deleteCategory, fetchCategory } from "../api/categories.api";

export function useCategory(collectionPath: ICollection["path"], categoryPath: ICategory["path"]) {
    return useQuery({
        queryKey: ["collections", collectionPath, "categories", categoryPath],
        queryFn: () => fetchCategory(collectionPath, categoryPath),
    });
}

export function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            collectionPath,
            categoryData,
        }: {
            collectionPath: ICollection["path"];
            categoryData: ICategory;
        }) => addCategoryToCollection(collectionPath, categoryData),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["collections", variables.collectionPath],
            });
        },
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            collectionPath,
            categoryPath,
        }: {
            collectionPath: ICollection["path"];
            categoryPath: ICategory["path"];
        }) => deleteCategory(collectionPath, categoryPath),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["collections", variables.collectionPath],
            });
        },
    });
}
