"use client";

import { fetchCurrentUser } from "@/features/auth/api/auth.api";
import { useUserStore } from "@/store/userStore";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const { setUser, setAccessToken } = useUserStore();
    const [isProcessing, setIsProcessing] = useState(true);

    useEffect(() => {
        const handleAuth = async () => {
            const token = searchParams.get("token");
            const error = searchParams.get("error");

            if (error) {
                router.replace("/signin?error=google_auth_failed");
                return;
            }

            if (!token) {
                router.replace("/signin");
                return;
            }

            try {
                setAccessToken(token);

                const userData = await fetchCurrentUser();

                setUser(userData, token);

                queryClient.setQueryData(["currentUser"], userData);

                router.replace("/");
            } catch (error) {
                console.error("Error fetching user:", error);
                setAccessToken(null);
                router.replace("/signin?error=auth_failed");
            } finally {
                setIsProcessing(false);
            }
        };

        handleAuth();
    }, [searchParams, router, setAccessToken, setUser, queryClient]);

    if (isProcessing) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                </div>
            </div>
        );
    }

    return null;
}
