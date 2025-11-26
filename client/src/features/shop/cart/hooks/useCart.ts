import { useUserStore } from "@/store/userStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    addCartItemToUser,
    deleteCartFromUser,
    deleteCartItemFromUser,
    fetchAllCartItemsFromUser,
} from "../api/cart.api";
import { ICartItem } from "../types/cart.types";

export function useCartItemsFromUser() {
    const { accessToken } = useUserStore();
    return useQuery({
        queryKey: ["cart"],
        queryFn: () => fetchAllCartItemsFromUser(),
        enabled: !!accessToken,
        retry: false,
        placeholderData: [],
    });
}

export function useAddCartItemToUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartItem: Omit<ICartItem, "id">) => addCartItemToUser(cartItem),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
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

export function useDeleteCartItemFromUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (cartItemId: string) => deleteCartItemFromUser(cartItemId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
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

export function useDeleteCartFromUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteCartFromUser(),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            queryClient.invalidateQueries({ queryKey: ["currentUser"] });
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
