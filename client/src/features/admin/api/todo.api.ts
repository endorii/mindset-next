import { httpServiceAuth } from "@/shared/api/httpService";
import { ITodoItem } from "../types/admin.types";

interface TodosResponse {
    message: string;
    todo?: ITodoItem;
}

export async function addTodoItem(data: ITodoItem): Promise<TodosResponse> {
    try {
        const { data: response } = await httpServiceAuth.post("/admin/todo", data);
        return response;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function getTodoList(): Promise<ITodoItem[]> {
    try {
        const { data } = await httpServiceAuth.get("/admin/todo");
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function updateTodoItem(
    todoId: string,
    data: Partial<ITodoItem>
): Promise<TodosResponse> {
    try {
        const { data: response } = await httpServiceAuth.patch(`/admin/todo/${todoId}`, data);
        return response;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function deleteTodoItem(todoId: string): Promise<TodosResponse> {
    try {
        const { data } = await httpServiceAuth.delete(`/admin/todo/${todoId}`);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

function handleHttpError(error: any): never {
    const message = error?.response?.data?.message || error.message || "Unknown server error";

    const status = error?.response?.status;

    const err: any = new Error(message);
    if (status) err.status = status;

    throw err;
}
