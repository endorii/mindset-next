import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    addFavoriteToUser,
    deleteFavoriteFromUser,
    fetchFavoritesFromUser,
} from "../api/favorites.api";
import { IFavoriteItem } from "../types/favorites.types";

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
        },
    });
}

export function useDeleteFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) => deleteFavoriteFromUser(productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });
}
