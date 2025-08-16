"use client";

import AdminHeader from "@/features/admin/components/layout/AdminHeader";
import AdminNavigation from "@/features/admin/components/layout/AdminNavigation";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);

    const { data: user } = useCurrentUser();

    useEffect(() => {
        const checkAdminAccess = async () => {
            try {
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
