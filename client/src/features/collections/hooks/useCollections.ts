import { fetchAdminCollectionCategories } from "@/features/categories/api/categories.api";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    createCollection,
    deleteCollection,
    editCollection,
    fetchAdminCollection,
    fetchAdminCollections,
    fetchShopCollections,
} from "../api/collections.api";
import { ICollection } from "../types/collections.types";

export function useShopCollections() {
    return useSuspenseQuery({
        queryKey: ["shop", "collections"],
        queryFn: () => fetchShopCollections(),
    });
}

export function useAdminCollections() {
    return useSuspenseQuery({
        queryKey: ["admin", "collections"],
        queryFn: () => fetchAdminCollections(),
    });
}

export function useAdminCollection(collectionId: string) {
    return useSuspenseQuery({
        queryKey: ["admin", "collections", collectionId],
        queryFn: () => fetchAdminCollection(collectionId),
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

export function useAdminCollectionCategories(collectionId: string) {
    return useSuspenseQuery({
        queryKey: ["admin", "collections", collectionId, "categories"],
        queryFn: () => fetchAdminCollectionCategories(collectionId),
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
                description: string;
                isVisible: boolean;
            };
        }) => editCollection(collectionId, data),
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
