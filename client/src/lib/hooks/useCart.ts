import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    addCartItemToUser,
    deleteCartItemFromUser,
    fetchAllCartItemsFromUser,
} from "../api/cart.api";
import { ICartItem } from "@/types/cart/cart.types";

export function useCartItemsFromUser(userId: string) {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: () => fetchAllCartItemsFromUser(userId),
    });
}

export function useAddCartItemToUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, cartItem }: { userId: string; cartItem: ICartItem }) =>
            addCartItemToUser(userId, cartItem),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["currentUser"],
            });
        },
    });
}

export function useDeleteCartItemFromUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, productId }: { userId: string; productId: string }) =>
            deleteCartItemFromUser(userId, productId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
        },
    });
}
