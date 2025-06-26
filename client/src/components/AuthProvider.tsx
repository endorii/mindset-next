"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/lib/hooks/useUsers";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { data: currentUser, isLoading, isError } = useCurrentUser();

    useEffect(() => {}, [currentUser, isLoading, isError, router]);

    return <>{children}</>;
}
