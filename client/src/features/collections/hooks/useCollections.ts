import { TStatus } from "@/shared/types/types";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    createCollection,
    deleteCollection,
    editCollection,
    fetchCollections,
    fetchGetCollectionByPath,
} from "../api/collections.api";
import { ICollection } from "../types/collections.types";

export function useGetCollections() {
    return useSuspenseQuery({
        queryKey: ["collections"],
        queryFn: () => fetchCollections(),
    });
}

export function useGetCollectionByPath(collectionPath: string) {
    return useSuspenseQuery({
        queryKey: ["collection", collectionPath],
        queryFn: () => fetchGetCollectionByPath(collectionPath),
    });
}

export function useCreateCollection() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Omit<ICollection, "banner">) => createCollection(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["collections"],
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
            };
        }) => editCollection(collectionId, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["collections"] });
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
            queryClient.invalidateQueries({ queryKey: ["collections"] });
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
