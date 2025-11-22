// app/(admin)/layout.tsx
"use client";

import { AdminHeader } from "@/features/admin/components/layout/AdminHeader";
import { AdminNavigation } from "@/features/admin/components/layout/AdminNavigation";
import { SpinnerIcon } from "@/shared/icons";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const { user, accessToken } = useUserStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        // Даємо час на гідрацію стору з root layout
        const timer = setTimeout(() => {
            setIsChecking(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (isChecking) return;

        if (!user || !accessToken) {
            toast.info("You are not logged in. Redirecting to login page...");
            router.replace("/auth");
            return;
        }

        if (user.role !== "admin") {
            toast.info("You dont have access to the admin panel");
            router.replace("/account");
            return;
        }
    }, [user, accessToken, isChecking, router]);

    if (isChecking || !user || user.role !== "admin") {
        return (
            <div className="text-white flex flex-col gap-[10px] h-screen w-full justify-center items-center pb-[10%]">
                <div className="text-xl font-bold">
                    {isChecking ? "Loading admin page..." : "Pending access..."}
                </div>
                <div>
                    <SpinnerIcon className="w-[70px] h-[70px] fill-white animate-spin" />
                </div>
            </div>
        );
    }

    return (
        <div>
            <AdminHeader />
            <AdminNavigation>{children}</AdminNavigation>
        </div>
    );
}
