import { ILoginCredentials, IAuthResponse, CreateUserDto } from "@/types/auth/auth.types";
import { IUser } from "@/types/user/user.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function registerUser(data: CreateUserDto): Promise<IAuthResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
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
        const response = await fetch(`${API_BASE_URL}/auth/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
        });

        if (!response.ok) {
            throw new Error("Помилка отримання користувача");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error getting current user:", error);
        throw error;
    }
}

export async function refreshToken(refreshToken: string): Promise<IAuthResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка оновлення токена");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error refreshing token:", error);
        throw new Error("Помилка оновлення токена");
    }
}

export async function logout(): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/signout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getAccessToken()}`,
            },
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

// Helper to get access token from cookies
function getAccessToken() {
    if (typeof document !== "undefined") {
        const cookies = document.cookie.split(";").reduce((acc, cookie) => {
            const [key, value] = cookie.trim().split("=");
            acc[key] = value;
            return acc;
        }, {} as Record<string, string>);
        return cookies.accessToken;
    }
    return "";
}
