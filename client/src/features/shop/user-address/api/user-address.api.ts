import { httpServiceAuth } from "@/shared/api/httpService";
import { ServerResponseWithMessage } from "@/shared/interfaces/interfaces";
import { IUserShippingAdress } from "../../user-info/types/user.types";

export async function createUserAddress(
    payload: IUserShippingAdress
): Promise<ServerResponseWithMessage<IUserShippingAdress>> {
    try {
        const { data } = await httpServiceAuth.post("/shop/user-address", payload);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

export async function editUserAddress(
    payload: Partial<IUserShippingAdress>
): Promise<ServerResponseWithMessage<IUserShippingAdress>> {
    try {
        const { data } = await httpServiceAuth.patch("/shop/user-address", payload);
        return data;
    } catch (error: unknown) {
        handleHttpError(error);
    }
}

function handleHttpError(error: any): never {
    const message = error?.response?.data?.message || error.message || "Unknown server error";

    const status = error?.response?.status;

    const err: any = new Error(message);
    if (status) err.status = status;

    throw err;
}
