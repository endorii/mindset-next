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
        mutationFn: ({ id, data }: { id: string; data: ITodoItem }) => updateTodoItem(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
        },
    });
}

export function useDeleteTodoItem() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteTodoItem(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todo"] });
        },
    });
}
