import { useCartStore } from "@/store/useCartStore";
import { useMutation, useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import {
    createOrder,
    deleteOrder,
    getOrderByStripeSessionId,
    getOrders,
    getOrdersByUserId,
    updateOrder,
} from "../api/orders.api";
import { IOrder, IOrderPayload } from "../types/orders.types";

export function useOrders() {
    return useSuspenseQuery({
        queryKey: ["orders"],
        queryFn: () => getOrders(),
    });
}

export function useUserOrders() {
    return useQuery({
        queryKey: ["orders", "currentUser"],
        queryFn: () => getOrdersByUserId(),
    });
}

export function useOrderByStripeSessionId(sessionId: string | null | undefined) {
    return useQuery({
        queryKey: ["order", sessionId],
        queryFn: () => getOrderByStripeSessionId(sessionId!),
        enabled: !!sessionId,
    });
}

export function useCreateOrder() {
    const queryClient = useQueryClient();
    const { clearCart } = useCartStore();

    return useMutation({
        mutationFn: (data: IOrderPayload) => createOrder(data),
        onSuccess: (data) => {
            if (!data.data?.userId) {
                clearCart();
            } else {
                queryClient.invalidateQueries({ queryKey: ["orders"] });
                queryClient.invalidateQueries({ queryKey: ["cart"] });
            }
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

export function useUpdateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderId, data }: { orderId: string; data: Partial<IOrder> }) =>
            updateOrder(orderId, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
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

export function useDeleteOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (orderId: string) => deleteOrder(orderId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
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
