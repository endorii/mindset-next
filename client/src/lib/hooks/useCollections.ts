import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCollection, fetchCollections } from "@/lib/api/collections.api";
import { ICollection } from "@/types/types";

export function useCollections() {
    return useQuery({
        queryKey: ["collections"],
        queryFn: () => fetchCollections(),
    });
}

export function useCollection(collectionPath: ICollection["path"]) {
    return useQuery({
        queryKey: ["collections", collectionPath],
        queryFn: () => fetchCollection(collectionPath),
    });
}
