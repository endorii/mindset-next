import { IUser } from "@/features/shop/user-info/types/user.types";
import { fetchWithRefresh } from "@/shared/api/fetchWithRefresh";
import { CreateUserDto, IAuthResponse, ILoginCredentials } from "../types/auth.types";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function registerUser(data: CreateUserDto): Promise<ServerResponseWithMessage> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function verifyUser(token: string): Promise<ServerResponseWithMessage> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/verify?token=${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (!response.ok) {
            const error: any = new Error(data.message || `Помилка ${response.status}`);
            error.status = response.status;
            throw error;
        }

        return data;
    } catch (error: any) {
        throw error;
    }
}

export async function resendVerifyUser(email: string): Promise<ServerResponseWithMessage> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/resend-verification`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (!response.ok) {
            const error: any = new Error(data.message || `Помилка ${response.status}`);
            error.status = response.status;
            throw error;
        }

        return data;
    } catch (error: any) {
        throw error;
    }
}

export async function loginUser(
    credentials: ILoginCredentials
): Promise<ServerResponseWithMessage<ServerResponseWithMessage>> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function currentUser(): Promise<IUser> {
    try {
        const response = await fetchWithRefresh(`${API_BASE_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function refreshToken(): Promise<IAuthResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}

export async function logoutUser(): Promise<ServerResponseWithMessage> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        const text = await response.text();
        const parsedData = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const error: any = new Error(
                parsedData.message || `Помилка ${parsedData.statusCode || response.status}`
            );
            error.status = parsedData.statusCode || response.status;
            throw error;
        }

        return parsedData;
    } catch (error: any) {
        throw error;
    }
}
