"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminHeader from "@/components/AdminPage/Header/AdminHeader";
import AdminNavigation from "@/components/AdminPage/Navigation/AdminNavigation";
import { getCurrentUser } from "@/lib/api/auth.api";
import { IUser } from "@/types/user/user.types";

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
                router.push("/login");
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
