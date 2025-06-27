import { refreshToken } from "@/lib/api/auth.api";

export async function fetchWithRefresh(
    input: RequestInfo | URL,
    init: RequestInit = {}
): Promise<Response> {
    init.credentials = "include";

    let response = await fetch(input, init);

    if (response.status !== 401) return response;

    try {
        const refreshed = await refreshToken();

        // Якщо оновлення неуспішне — НЕ повторювати
        if (!refreshed || typeof refreshed.id === "undefined") {
            throw new Error("Refresh token failed");
        }

        // Повторити початковий запит
        return await fetch(input, init);
    } catch (error) {
        console.error("Unauthorized - redirecting to login");

        if (typeof window !== "undefined" && window.location.pathname !== "/login") {
            window.location.href = "/login";
        }

        throw error;
    }
}
