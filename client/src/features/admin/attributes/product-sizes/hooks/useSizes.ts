import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSize, deleteSize, editSize, fetchSizes } from "../api/sizes.api";
import { ISizePayload } from "../types/product-size.types";
import { toast } from "sonner";

export function useSizes() {
    return useQuery({
        queryKey: ["sizes"],
        queryFn: () => fetchSizes(),
    });
}

export function useCreateSize() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ISizePayload) => createSize(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["sizes"],
            });
            toast.success("Розмір успішно додано!");
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

export function useEditSize() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ sizeId, data }: { sizeId: string; data: ISizePayload }) =>
            editSize(sizeId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sizes"] });
            toast.success("Розмір успішно відредаговано!");
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

export function useDeleteSize() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (sizeId: string) => deleteSize(sizeId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["sizes"],
            });
            toast.success("Розмір видалено!");
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
