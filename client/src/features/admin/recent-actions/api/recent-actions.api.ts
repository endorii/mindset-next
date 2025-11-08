import { httpServiceAuth } from "@/shared/api/httpService";
import { IRecentActions } from "../types/recent-actions.types";

export async function fetchRecentActionsFromUser(): Promise<IRecentActions[]> {
    try {
        const { data } = await httpServiceAuth.get("/admin/recent-actions");
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
