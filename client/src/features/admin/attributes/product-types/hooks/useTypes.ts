import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ITypePayload } from "../types/product-type.types";
import { createType, deleteType, editType, fetchTypes } from "../api/types.api";

export function useTypes() {
    return useQuery({
        queryKey: ["types"],
        queryFn: () => fetchTypes(),
    });
}

export function useCreateType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ITypePayload) => createType(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["types"],
            });
        },
    });
}

export function useEditType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ typeId, data }: { typeId: string; data: ITypePayload }) =>
            editType(typeId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["types"] });
        },
    });
}

export function useDeleteType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (typeId: string) => deleteType(typeId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["types"],
            });
        },
    });
}
