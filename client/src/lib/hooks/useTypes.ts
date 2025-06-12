import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createType, deleteType, fetchTypes } from "../api/types.api";
import { IType, ITypePayload } from "@/types/type/type.types";

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

export function useDeleteType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (typeId: IType["id"]) => deleteType(typeId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["types"],
            });
        },
    });
}
