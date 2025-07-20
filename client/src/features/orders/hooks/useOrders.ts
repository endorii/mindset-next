import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createOrder,
    deleteOrder,
    getOrders,
    getOrdersByUserId,
    updateOrder,
} from "../api/orders.api";
import { IOrder } from "../types/orders.types";

export function useOrders() {
    return useQuery({
        queryKey: ["orders"],
        queryFn: () => getOrders(),
    });
}

export function useUserOrders(userId: string) {
    return useQuery({
        queryKey: ["orders", userId],
        queryFn: () => getOrdersByUserId(userId),
        enabled: !!userId,
    });
}

export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: IOrder) => createOrder(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });
}

export function useUpdateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderId, data }: { orderId: string; data: Partial<IOrder> }) =>
            updateOrder(orderId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });
}

export function useDeleteOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (orderId: string) => deleteOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
        },
    });
}
