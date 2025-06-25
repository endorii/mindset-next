import { ILoginData, IRegisterData, IAuthResponse } from "@/types/auth/auth.types";
import { IUser } from "@/types/user/user.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function register(data: IRegisterData): Promise<IUser> {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Помилка створення користувача");
    }

    return await response.json();
}

export async function login(data: ILoginData): Promise<IAuthResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Помилка входу користувача");
    }

    return await response.json();
}
