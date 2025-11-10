import { useUserStore } from "@/store/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    addFavoriteToUser,
    deleteFavoriteFromUser,
    fetchFavoritesFromUser,
} from "../api/favorites.api";

export function useFavoritesFromUser() {
    const { accessToken } = useUserStore();

    return useQuery({
        queryKey: ["favorites"],
        queryFn: () => fetchFavoritesFromUser(),
        enabled: !!accessToken,
        retry: false,
        placeholderData: [],
    });
}

export function useAddFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (productId: string) => addFavoriteToUser(productId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            });
            toast.success(data.message);
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
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["favorites"] });
            toast.success(data.message);
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
