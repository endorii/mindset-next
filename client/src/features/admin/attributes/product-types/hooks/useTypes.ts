import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createType, deleteType, editType, fetchTypes } from "../api/types.api";
import { ITypePayload } from "../types/product-type.types";

export function useTypes() {
    return useSuspenseQuery({
        queryKey: ["types"],
        queryFn: () => fetchTypes(),
    });
}

export function useCreateType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ITypePayload) => createType(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["types"],
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

export function useEditType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ typeId, data }: { typeId: string; data: ITypePayload }) =>
            editType(typeId, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["types"] });
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

export function useDeleteType() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (typeId: string) => deleteType(typeId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["types"],
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
