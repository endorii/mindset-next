"use client";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { data: currentUser, isPending, isError } = useCurrentUser();

    useEffect(() => {}, [currentUser, isPending, isError, router]);

    return <>{children}</>;
}
