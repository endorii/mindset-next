import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCollection, fetchCollections, createCollection } from "@/lib/api/collections.api";
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

export function useCreateCollection() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCollection,
        onSuccess: (newCollection) => {
            queryClient.setQueryData<ICollection[]>(["collections"], (old = []) => [
                ...old,
                newCollection,
            ]);
        },
    });
}
