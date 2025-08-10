import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createCollection,
    deleteCollection,
    editCollection,
    fetchCollections,
    fetchGetCollectionByPath,
} from "../api/collections.api";

import { ICollection } from "../types/collections.types";
import { TStatus } from "@/shared/types/types";

export function useGetCollections() {
    return useQuery({
        queryKey: ["collections"],
        queryFn: () => fetchCollections(),
    });
}

export function useGetCollectionByPath(collectionPath: ICollection["path"]) {
    return useQuery({
        queryKey: ["collection", collectionPath],
        queryFn: () => fetchGetCollectionByPath(collectionPath),
    });
}

export function useCreateCollection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createCollection,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["collections"],
            });
        },
    });
}

export function useEditCollection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            collectionId,
            data,
        }: {
            collectionId: string;
            data: {
                name: string;
                path: string;
                status: TStatus;
                banner: string;
            };
        }) => editCollection(collectionId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["collections"] });
        },
    });
}

export function useDeleteCollection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (collectionId: string) => deleteCollection(collectionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["collections"] });
        },
    });
}
