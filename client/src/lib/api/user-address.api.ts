import { IUser, IUserShippingAdress } from "@/types/user/user.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function createUserAddress(data: IUserShippingAdress): Promise<IUserShippingAdress> {
    try {
        const response = await fetch(`${API_BASE_URL}/user-address`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Помилка створення адреси доставки");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error creating user address:", error);
        throw new Error("Помилка створення адреси доставки");
    }
}

export async function editUserAddress(
    userId: IUser["id"],
    data: Partial<IUserShippingAdress>
): Promise<IUserShippingAdress> {
    try {
        const response = await fetch(`${API_BASE_URL}/user-address/${userId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Не вдалося оновити адресу доставки");
        }

        return await response.json();
    } catch (error) {
        console.error("Fetch error updating user address:", error);
        throw new Error("Не вдалося оновити адресу доставки");
    }
}
