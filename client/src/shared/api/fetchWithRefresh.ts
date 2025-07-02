import { refreshToken } from "@/features/auth/api/auth.api";

export async function fetchWithRefresh(
    input: RequestInfo | URL,
    init: RequestInit = {}
): Promise<Response> {
    init.credentials = "include";

    let response = await fetch(input, init);

    if (response.status !== 401) return response;

    try {
        const refreshed = await refreshToken();

        if (!refreshed || typeof refreshed.id === "undefined") {
            throw new Error("Refresh token failed");
        }

        return await fetch(input, init);
    } catch (error) {
        console.error("Unauthorized - redirecting to login");
        throw error;
    }
}
