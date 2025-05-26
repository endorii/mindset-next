import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategories } from "../api/categoriesApi";

export function useCategories(collectionId: string) {
    return useQuery({
        queryKey: ["categories", collectionId],
        queryFn: () => fetchCategories(collectionId),
    });
}
