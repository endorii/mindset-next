import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createColor, deleteColor, editColor, fetchColors } from "../api/colors.api";
import { IColorPayload } from "../types/product-color.types";

export function useColors() {
    return useSuspenseQuery({
        queryKey: ["colors"],
        queryFn: () => fetchColors(),
    });
}

export function useCreateColor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: IColorPayload) => createColor(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["colors"],
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

export function useEditColor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ colorId, data }: { colorId: string; data: Partial<IColorPayload> }) =>
            editColor(colorId, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["colors"] });
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

export function useDeleteColor() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (colorId: string) => deleteColor(colorId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["colors"],
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
