import { IUser } from "@/features/shop/user-info/types/user.types";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function refreshAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken")?.value; // "refreshToken=..."
    // console.log("Токен з кукі", refreshToken);

    try {
        const res = await fetch(`${API_BASE_URL}/auth/refresh`, {
            method: "POST",
            headers: { cookie: `refreshToken=${refreshToken}` },
            credentials: "include",
        });

        if (!res.ok) return null;

        const data = await res.json();

        // console.log("accessToken:", data.data.accessToken);
        return data.data || null;
    } catch (e) {
        return null;
    }
}

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

    const user = (await res.json()) as IUser;

    return { user, accessToken };
}
