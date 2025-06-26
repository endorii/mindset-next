"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";
import { useRouter } from "next/navigation";

// ...
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { refreshToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const refreshTokenFromCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.trim().startsWith("refreshToken="))
            ?.split("=")[1];

        if (refreshTokenFromCookie) {
            refreshToken(refreshTokenFromCookie);
        }
    }, [refreshToken, router]);

    return <>{children}</>;
}
