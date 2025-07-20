import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    addFavoriteToUser,
    deleteFavoriteFromUser,
    fetchFavoritesFromUser,
} from "../api/favorites.api";
import { IFavoriteItem } from "../types/favorites.types";

export function useFavoritesFromUser(userId: string) {
    return useQuery({
        queryKey: ["favorites"],
        queryFn: () => fetchFavoritesFromUser(userId),
        enabled: !!userId,
    });
}

export function useAddFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, favoriteItem }: { userId: string; favoriteItem: IFavoriteItem }) =>
            addFavoriteToUser(userId, favoriteItem),
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
        mutationFn: ({ userId, productId }: { userId: string; productId: string }) =>
            deleteFavoriteFromUser(userId, productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
        },
    });
}
