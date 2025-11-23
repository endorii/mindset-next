import { httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { AxiosError } from "axios";
import { ITodoItem } from "../types/admin.types";

interface ErrorResponse {
    message?: string;
}

interface HttpError extends Error {
    status?: number;
}

export async function addTodoItem(data: ITodoItem): Promise<ServerResponseWithMessage> {
    try {
        const { data: response } = await httpServiceAuth.post<ServerResponseWithMessage>(
            "/admin/todo",
            data
        );
        return response;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function getTodoList(): Promise<ITodoItem[]> {
    try {
        const { data } = await httpServiceAuth.get<ITodoItem[]>("/admin/todo");
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function updateTodoItem(
    todoId: string,
    data: Partial<ITodoItem>
): Promise<ServerResponseWithMessage> {
    try {
        const { data: response } = await httpServiceAuth.patch<ServerResponseWithMessage>(
            `/admin/todo/${todoId}`,
            data
        );
        return response;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function deleteTodoItem(todoId: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.delete<ServerResponseWithMessage>(
            `/admin/todo/${todoId}`
        );
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

function handleHttpError(error: unknown): never {
    if (error instanceof AxiosError) {
        const message =
            (error.response?.data as ErrorResponse)?.message ||
            error.message ||
            "Unknown server error";

        const status = error.response?.status;

        const err = new Error(message) as HttpError;
        if (status) err.status = status;

        throw err;
    }

    if (error instanceof Error) {
        throw error;
    }

    throw new Error("Unknown error occurred");
}
