import { IUser, IUserShippingAdress } from "../../user-info/types/user.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function createUserAddress(data: IUserShippingAdress): Promise<IUserShippingAdress> {
    try {
        const response = await fetch(`${API_BASE_URL}/user-address`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
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
            throw new Error(errorData.message);
        }

        return await response.json();
    } catch (error: any) {
        throw new Error(error?.message || "Помилка з'єднання із сервером");
    }
}
