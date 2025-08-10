import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createColor, deleteColor, editColor, fetchColors } from "../api/colors.api";
import { IColorPayload } from "../types/product-color.types";

export function useColors() {
    return useQuery({
        queryKey: ["colors"],
        queryFn: () => fetchColors(),
    });
}

export function useCreateColor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: IColorPayload) => createColor(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["colors"],
            });
        },
    });
}

export function useEditColor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ colorId, data }: { colorId: string; data: Partial<IColorPayload> }) =>
            editColor(colorId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["colors"] });
        },
    });
}

export function useDeleteColor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (colorId: string) => deleteColor(colorId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["colors"],
            });
        },
    });
}
