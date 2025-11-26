import { IUser } from "@/features/shop/user-info/types/user.types";
import { httpService, httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { AxiosError } from "axios";
import { CreateUserDto, ILoginCredentials } from "../types/auth.types";

export async function registerUser(data: CreateUserDto): Promise<ServerResponseWithMessage> {
    try {
        const { data: response } = await httpService.post("/auth/signup", data);
        return response;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function verifyUser(token: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpService.get(`/auth/verify?token=${token}`);
        return data;
    } catch (error: unknown) {
        handleAxiosError(error);
    }
}

export async function resendVerifyUser(email: string): Promise<ServerResponseWithMessage> {
    try {
        const { data } = await httpService.post("/auth/resend-verification", { email });
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

export async function fetchCurrentUser(): Promise<IUser | null> {
    try {
        const { data } = await httpServiceAuth.get("/auth/me");
        return data;
    } catch (error: any) {
        console.error("Failed to fetch current user:", error);
        return null;
    }
}

export async function refreshToken(): Promise<{ data: string; message: string }> {
    try {
        const { data } = await httpServiceAuth.post("/auth/refresh");

        if (!data.data) throw new Error("No access token returned from server");

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
