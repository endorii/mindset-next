import { useQuery, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import {
    createCollection,
    deleteCollection,
    editCollection,
    fetchCollections,
    fetchGetCollectionByPath,
} from "../api/collections.api";
import { TStatus } from "@/shared/types/types";
import { toast } from "sonner";

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
        mutationFn: createCollection,
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
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["collections"] });
            toast.success(data.message);
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
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["collections"] });
            toast.success(data.message);
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
