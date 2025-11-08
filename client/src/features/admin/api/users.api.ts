import { IUser } from "@/features/shop/user-info/types/user.types";
import { httpServiceAuth } from "@/shared/api/httpService";

export async function fetchAllUsers(): Promise<IUser[]> {
    try {
        const { data } = await httpServiceAuth.get("/admin/users");
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
