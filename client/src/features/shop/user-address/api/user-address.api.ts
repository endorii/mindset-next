import { IUser, IUserShippingAdress } from "../../user-info/types/user.types";

const API_BASE_URL = "http://localhost:5000/api";

export async function createUserAddress(data: IUserShippingAdress): Promise<IUserShippingAdress> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/user-address`, {
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

export async function editUserAddress(
    data: Partial<IUserShippingAdress>
): Promise<IUserShippingAdress> {
    try {
        const response = await fetch(`${API_BASE_URL}/shop/user-address`, {
            method: "PATCH",
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
