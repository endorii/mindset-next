import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    addFavoriteToUser,
    deleteFavoriteFromUser,
    fetchFavoritesFromUser,
} from "../api/favorites.api";
import { toast } from "sonner";

export function useFavoritesFromUser() {
    return useQuery({
        queryKey: ["favorites"],
        queryFn: () => fetchFavoritesFromUser(),
    });
}

export function useAddFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) => addFavoriteToUser(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            });
            toast.success("Товар додано до вподобаних");
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

export function useDeleteFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) => deleteFavoriteFromUser(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
            toast.success("Товар видалено з вподобаних");
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
