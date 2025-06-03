import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ICategory, ICollection } from "@/types/types";
import { addCategoryToCollection, fetchCategory } from "../api/categories.api";

export function useCategory(collectionPath: ICollection["path"], categoryPath: ICategory["path"]) {
    return useQuery({
        queryKey: ["collections", collectionPath, "categories", categoryPath],
        queryFn: () => fetchCategory(collectionPath, categoryPath),
    });
}

export function useCreateCartegory(collectionPath: ICollection["path"]) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (categoryData: ICategory) =>
            addCategoryToCollection(collectionPath, categoryData),
        onSuccess: (newCategory) => {
            queryClient.setQueryData(
                ["collections", collectionPath, "categories"],
                (oldData: any) => {
                    if (!oldData) return oldData;

                    return {
                        ...oldData,
                        categories: [...(oldData.categories || []), newCategory],
                    };
                }
            );
        },
    });
}
