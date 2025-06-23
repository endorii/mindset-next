import { IUser } from "@/types/user/user.types";
import { IRegisterData } from "@/types/auth/auth.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function register(data: IRegisterData): Promise<IUser> {
    try {
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
    } catch (error) {
        console.error("Fetch error creating user:", error);
        throw new Error("Помилка створення користувача");
    }
}
