import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createSize, deleteSize, fetchSizes } from "../api/sizes.api";
import { ISize, ISizePayload } from "@/types/size/size.types";

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
