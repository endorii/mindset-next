import { IUser } from "@/features/shop/user-info/types/user.types";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getCurrentUserSSR(): Promise<{
    user: IUser | null;
    accessToken: string | null;
}> {
    const accessToken = await refreshAccessToken();

    if (!accessToken) return { user: null, accessToken: null };

    const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: "no-store",
    });

    if (!res.ok) return { user: null, accessToken: null };

    const user: IUser = await res.json();

    return { user, accessToken };
}

async function refreshAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();

    console.log("SSR cookies:", cookieStore.getAll());
    const refreshToken = cookieStore.get("refreshToken")?.value; // "refreshToken=..."

    if (!refreshToken) return null;

    try {
        console.log("SSR sending refreshToken:", refreshToken);
        const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: {
                Cookie: `refreshToken=${refreshToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) return null;

        const data = await res.json();

        return data.data || null;
    } catch (e) {
        return null;
    }
}
