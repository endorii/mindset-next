import { httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { IUser } from "../types/user.types";

export async function editUser(payload: Partial<IUser>): Promise<ServerResponseWithMessage<IUser>> {
    try {
        const { data } = await httpServiceAuth.patch("/shop/users", payload);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function deleteUser(password: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.delete("/shop/users", {
            data: { password },
        });
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function changePassword(data: {
    oldPassword: string;
    newPassword: string;
}): Promise<ServerResponseWithMessage> {
    try {
        const { data: response } = await httpServiceAuth.patch("/shop/users/change-password", data);
        return response;
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
