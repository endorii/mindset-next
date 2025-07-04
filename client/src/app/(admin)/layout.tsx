"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/features/admin/components/layout/AdminHeader";
import AdminNavigation from "@/features/admin/components/layout/AdminNavigation";
import { getCurrentUser } from "@/features/auth/api/auth.api";
import { IUser } from "@/features/admin/user-info/types/user.types";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);

    useEffect(() => {
        const checkAdminAccess = async () => {
            try {
                const user: IUser = await getCurrentUser();

                if (user && user.role === "ADMIN") {
                    setHasAccess(true);
                } else {
                    console.warn(
                        "Access Denied: User is not an admin or not logged in."
                    );
                    router.push("/");
                }
            } catch (error) {
                router.push("/auth");
                console.error("Error checking admin access:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAdminAccess();
    }, [router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <p className="text-xl text-gray-700">
                    Завантаження адмін-панелі...
                </p>
                {/* Можна додати красивий спіннер тут */}
            </div>
        );
    }

    if (!hasAccess) {
        return null;
    }

    return (
        <>
            <AdminHeader />
            <AdminNavigation>{children}</AdminNavigation>
        </>
    );
}
