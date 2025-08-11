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
import { toast } from "sonner";

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
            toast.success("Колекцію успішно створено!");
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("Сталася невідома помилка");
            }
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
            toast.success("Колекцію успішно відредаговано!");
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("Сталася невідома помилка");
            }
        },
    });
}

export function useDeleteCollection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (collectionId: string) => deleteCollection(collectionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["collections"] });
            toast.success("Колекцію видалено!");
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("Сталася невідома помилка");
            }
        },
    });
}
