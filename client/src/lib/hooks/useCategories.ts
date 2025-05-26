import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories } from "../api/categoriesApi";

export function useCategories(collectionPath: string) {
    return useQuery({
        queryKey: ["categories", collectionPath],
        queryFn: () => fetchCategories(collectionPath),
    });
}
