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
            toast.success("Товар додано у кошик!");
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

export function useDeleteCartItemFromUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartItemId: string) => deleteCartItemFromUser(cartItemId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Товар видалено з кошика!");
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

export function useDeleteCartFromUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteCartFromUser(),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Корзину очищено!");
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
