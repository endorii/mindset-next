import { useQuery, useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { addTodoItem, deleteTodoItem, getTodoList, updateTodoItem } from "../api/todo.api";
import { ITodoItem } from "../types/admin.types";
import { toast } from "sonner";

export function useTodoList() {
    return useSuspenseQuery({
        queryKey: ["todo"],
        queryFn: () => getTodoList(),
    });
}

export function useCreateTodoItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ITodoItem) => addTodoItem(data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ["todo"],
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

export function useUpdateTodoItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ todoId, data }: { todoId: string; data: ITodoItem }) =>
            updateTodoItem(todoId, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
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

export function useDeleteTodoItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (todoId: string) => deleteTodoItem(todoId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
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
