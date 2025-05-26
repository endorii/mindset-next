import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCategoriesFromCollectionByPath, fetchCollections } from "@/lib/api/collectionsApi";

export function useCollections() {
    return useQuery({
        queryKey: ["collections"],
        queryFn: fetchCollections,
    });
}

export function useGetCategoriesFromCollection(collectionPath: string) {
    return useQuery({
        queryKey: ["collections", collectionPath],
        queryFn: () => fetchCategoriesFromCollectionByPath(collectionPath),
    });
}
