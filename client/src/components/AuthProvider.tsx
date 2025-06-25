"use client";

import { useEffect } from "react";
import { useAuth } from "@/lib/hooks/useAuth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { refreshToken } = useAuth();

    useEffect(() => {
        const refreshTokenFromCookie = document.cookie
            .split(";")
            .find((cookie) => cookie.trim().startsWith("refreshToken="))
            ?.split("=")[1];

        if (refreshTokenFromCookie) {
            refreshToken(refreshTokenFromCookie);
        }
    }, [refreshToken]);

    return <>{children}</>;
}
