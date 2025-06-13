import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    addCategoryToCollection,
    deleteCategory,
    editCategory,
    fetchCategory,
} from "../api/categories.api";
import { ICategory, ICategoryPayload } from "@/types/category/category.types";
import { ICollection } from "@/types/collection/collection.types";

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
            categoryData: ICategoryPayload;
        }) => addCategoryToCollection(collectionPath, categoryData),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["collections", variables.collectionPath],
            });
        },
    });
}

export function useEditCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            collectionPath,
            categoryPath,
            data,
        }: {
            collectionPath: ICollection["path"];
            categoryPath: ICategory["path"];
            data: {
                name: ICategory["name"];
                path: ICategory["path"];
                status: ICategory["status"];
                banner: ICategory["banner"];
            };
        }) => editCategory(collectionPath, categoryPath, data),
        onSuccess(_data, variables) {
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
