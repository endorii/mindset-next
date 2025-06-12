import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createColor, deleteColor, fetchColors } from "../api/colors.api";
import { IColor, IColorPayload } from "@/types/color/color.types";

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

export function useDeleteColor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (colorId: IColor["id"]) => deleteColor(colorId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["colors"],
            });
        },
    });
}
