import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodoItem, deleteTodoItem, getTodoList, updateTodoItem } from "../api/todo.api";
import { ITodoItem } from "../admin.types";

export function useTodoList() {
    return useQuery({
        queryKey: ["todo"],
        queryFn: () => getTodoList(),
    });
}

export function useCreateTodoItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ITodoItem) => addTodoItem(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["todo"],
            });
        },
    });
}

export function useUpdateTodoItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ todoId, data }: { todoId: string; data: ITodoItem }) =>
            updateTodoItem(todoId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
        },
    });
}

export function useDeleteTodoItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (todoId: string) => deleteTodoItem(todoId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
        },
    });
}
