import { refreshToken } from "@/features/auth/api/auth.api";

export async function fetchWithRefresh(
    input: RequestInfo | URL,
    init: RequestInit = {}
): Promise<Response> {
    init.credentials = "include";

    let response = await fetch(input, init);

    if (response.status !== 401) return response;

    const refreshed = await refreshToken();

    if (!refreshed) {
        // повертаємо фейковий response зі статусом 401
        return new Response(JSON.stringify({ message: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
        });
    }

    return await fetch(input, init);
}
