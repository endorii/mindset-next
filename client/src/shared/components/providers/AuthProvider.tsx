"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { data: currentUser, isPending, isError } = useCurrentUser();

    useEffect(() => {}, [currentUser, isPending, isError, router]);

    return <>{children}</>;
}
