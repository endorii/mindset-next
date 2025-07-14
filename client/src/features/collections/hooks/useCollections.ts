import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createCollection,
    deleteCollection,
    editCollection,
    fetchCollection,
    fetchCollections,
} from "../api/collections.api";

import { ICollection } from "../types/collections.types";
import { TStatus } from "@/shared/types/types";
import { toast } from "sonner";

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
            collectionPath,
            data,
        }: {
            collectionPath: ICollection["path"];
            data: {
                name: string;
                path: string;
                status: TStatus;
                banner: string;
            };
        }) => editCollection(collectionPath, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["collections"] });
        },
    });
}

export function useDeleteCollection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (collectionPath: ICollection["path"]) => deleteCollection(collectionPath),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["collections"] });
        },
    });
}
