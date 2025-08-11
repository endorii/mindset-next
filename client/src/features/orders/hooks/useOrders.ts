import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    createOrder,
    deleteOrder,
    getOrders,
    getOrdersByUserId,
    updateOrder,
} from "../api/orders.api";
import { IOrder } from "../types/orders.types";
import { toast } from "sonner";

export function useOrders() {
    return useQuery({
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

export function useCreateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: IOrder) => createOrder(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            toast.success("Замовлення успішно створено! Перенаправлення на сторінку оплати...");
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

export function useUpdateOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ orderId, data }: { orderId: string; data: Partial<IOrder> }) =>
            updateOrder(orderId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("Замовлення успішно відредаговано!");
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

export function useDeleteOrder() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (orderId: string) => deleteOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["orders"] });
            toast.success("Замовлення видалено!");
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
