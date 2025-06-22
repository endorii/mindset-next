import axios from "axios";
import { IUser, IUserShippingAdress } from "@/types/user/user.types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function createUserAddress(data: IUserShippingAdress): Promise<IUserShippingAdress> {
    try {
        const response = await axios.post<IUserShippingAdress>(
            `${API_BASE_URL}/user-address`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Axios error creating user address:", error);
        throw new Error("Помилка створення адреси доставки");
    }
}

export async function editUserAddress(
    userId: IUser["id"],
    data: Partial<IUserShippingAdress>
): Promise<IUserShippingAdress> {
    try {
        const response = await axios.patch<IUserShippingAdress>(
            `${API_BASE_URL}/user-address/${userId}`,
            data
        );
        return response.data;
    } catch (error) {
        console.error("Axios error updating user address:", error);
        throw new Error("Не вдалося оновити адресу доставки");
    }
}
