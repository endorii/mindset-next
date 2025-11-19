import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createSize, deleteSize, editSize, fetchSizes } from "../api/sizes.api";
import { ISizePayload } from "../types/product-size.types";

export function useSizes() {
    return useSuspenseQuery({
        queryKey: ["sizes"],
        queryFn: () => fetchSizes(),
    });
}

export function useCreateSize() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ISizePayload) => createSize(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["sizes"],
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

export function useEditSize() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ sizeId, data }: { sizeId: string; data: ISizePayload }) =>
            editSize(sizeId, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["sizes"] });
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

export function useDeleteSize() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (sizeId: string) => deleteSize(sizeId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["sizes"],
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
