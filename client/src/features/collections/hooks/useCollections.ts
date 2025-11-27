import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    createCollection,
    deleteCollection,
    editCollection,
    fetchAdminCollections,
    fetchGetAdminCollectionByPath,
    fetchShopCollections,
} from "../api/collections.api";
import { ICollection } from "../types/collections.types";

export function useGetShopCollections() {
    return useSuspenseQuery({
        queryKey: ["shop", "collections"],
        queryFn: () => fetchShopCollections(),
    });
}

export function useGetAdminCollections() {
    return useSuspenseQuery({
        queryKey: ["admin", "collections"],
        queryFn: () => fetchAdminCollections(),
    });
}

export function useGetAdminCollectionByPath(collectionPath: string) {
    return useSuspenseQuery({
        queryKey: ["admin", "collections", collectionPath],
        queryFn: () => fetchGetAdminCollectionByPath(collectionPath),
    });
}

export function useCreateCollection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<ICollection, "banner">) => createCollection(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["shop", "collections"] });
            queryClient.invalidateQueries({ queryKey: ["admin", "collections"] });
            toast.success(data.message);
        },

        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred.");
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
                isVisible: boolean;
            };
        }) => editCollection(collectionId, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({ queryKey: ["shop", "collections"] });
            queryClient.invalidateQueries({ queryKey: ["admin", "collections"] });
            queryClient.invalidateQueries({
                queryKey: ["shop", "collections", variables.collectionId],
            });
            queryClient.invalidateQueries({
                queryKey: ["admin", "collections", variables.collectionId],
            });

            toast.success(data.message);
        },

        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        },
    });
}

export function useDeleteCollection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (collectionId: string) => deleteCollection(collectionId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["shop", "collections"] });
            queryClient.invalidateQueries({ queryKey: ["admin", "collections"] });
            toast.success(data.message);
        },
        onError: (error: any) => {
            if (error?.message) {
                toast.error(error.message);
            } else {
                toast.error("An unknown error occurred.");
            }
        },
    });
}
