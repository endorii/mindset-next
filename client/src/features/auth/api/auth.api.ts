import { IUser } from "@/features/shop/user-info/types/user.types";
import { httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { AxiosError } from "axios";
import { CreateUserDto, ILoginCredentials } from "../types/auth.types";

export async function registerUser(data: CreateUserDto): Promise<ServerResponseWithMessage> {
    try {
        const { data: response } = await httpServiceAuth.post("/auth/signup", data);
        return response;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function verifyUser(token: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.get(`/auth/verify?token=${token}`);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function resendVerifyUser(email: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.post("/auth/resend-verification", { email });
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function loginUser(
    credentials: ILoginCredentials
): Promise<ServerResponseWithMessage<{ accessToken: string; user: IUser }>> {
    try {
        const { data } = await httpServiceAuth.post("/auth/signin", credentials);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function currentUser(): Promise<IUser> {
    try {
        const { data } = await httpServiceAuth.get("/auth/me");
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function refreshToken(): Promise<{ accessToken: string }> {
    try {
        const { data } = await httpServiceAuth.post("/auth/refresh");
        if (!data.accessToken) throw new Error("No access token returned from server");
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function logoutUser(): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpServiceAuth.post("/auth/signout");
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

// === Внутрішня допоміжна функція для обробки помилок Axios ===
function handleAxiosError(error: unknown): never {
    if (error instanceof AxiosError) {
        const message = error.response?.data?.message || error.message;
        const status = error.response?.status;
        const err: any = new Error(message);
        if (status) err.status = status;
        throw err;
    }
    throw error;
}
