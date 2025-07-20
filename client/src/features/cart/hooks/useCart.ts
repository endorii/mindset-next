import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    addCartItemToUser,
    deleteCartFromUser,
    deleteCartItemFromUser,
    fetchAllCartItemsFromUser,
} from "../api/cart.api";
import { ICartItem } from "../types/cart.types";

export function useCartItemsFromUser(userId: string) {
    return useQuery({
        queryKey: ["cart"],
        queryFn: () => fetchAllCartItemsFromUser(userId),
        enabled: !!userId,
    });
}

export function useAddCartItemToUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId, cartItem }: { userId: string; cartItem: ICartItem }) =>
            addCartItemToUser(userId, cartItem),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
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
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

export function useDeleteCartFromUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ userId }: { userId: string }) => deleteCartFromUser(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}
