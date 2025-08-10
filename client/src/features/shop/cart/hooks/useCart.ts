import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    addCartItemToUser,
    deleteCartFromUser,
    deleteCartItemFromUser,
    fetchAllCartItemsFromUser,
} from "../api/cart.api";
import { ICartItem } from "../types/cart.types";
import { toast } from "sonner";

export function useCartItemsFromUser() {
    return useQuery({
        queryKey: ["cart"],
        queryFn: () => fetchAllCartItemsFromUser(),
    });
}

export function useAddCartItemToUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartItem: ICartItem) => addCartItemToUser(cartItem),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["cart"],
            });
        },
        onError: (error: any) => {
            toast.error(error?.message || "Сталася невідома помилка");
        },
    });
}

export function useDeleteCartItemFromUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartItemId: string) => deleteCartItemFromUser(cartItemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}

export function useDeleteCartFromUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteCartFromUser(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
    });
}
