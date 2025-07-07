import { IUser } from "@/features/admin/user-info/types/user.types";
import { fetchWithRefresh } from "@/shared/api/fetchWithRefresh";
import { CreateUserDto, IAuthResponse, ILoginCredentials } from "../types/auth.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function registerUser(data: CreateUserDto): Promise<IAuthResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка реєстрації");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error registering user:", error);
        throw new Error("Помилка реєстрації");
    }
}

export async function login(credentials: ILoginCredentials): Promise<IAuthResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка входу");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error logging in:", error);
        throw new Error("Помилка входу");
    }
}

export async function getCurrentUser(): Promise<IUser> {
    try {
        const response = await fetchWithRefresh(`${API_BASE_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(
                errorData.message || "Помилка отримання даних авторизованого користувача"
            );
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error getting current user:", error);
        throw new Error("Помилка отримання даних авторизованого користувача");
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

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка оновлення refresh токена");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error refreshing token:", error);
        throw new Error("Помилка оновлення refresh токена");
    }
}

export async function logout(): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка виходу");
        }
    } catch (error) {
        console.error("Fetch error logging out:", error);
        throw new Error("Помилка виходу");
    }
}
