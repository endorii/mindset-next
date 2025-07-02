import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSize, deleteSize, editSize, fetchSizes } from "../api/sizes.api";
import { ISize, ISizePayload } from "../types/product-size.types";

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
        },
    });
}

export function useEditSize() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            sizeId,
            data,
        }: {
            sizeId: ISize["id"];
            data: {
                name: string;
            };
        }) => editSize(sizeId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["sizes"] });
        },
    });
}

export function useDeleteSize() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (sizeId: ISize["id"]) => deleteSize(sizeId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["sizes"],
            });
        },
    });
}
