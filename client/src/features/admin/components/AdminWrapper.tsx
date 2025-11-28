"use client";

import { SpinnerIcon } from "@/shared/icons";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function AdminWrapper({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, accessToken } = useUserStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsChecking(false), 50);
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
            toast.info("You don't have access to the admin panel");
            router.replace("/account");
        }
    }, [user, accessToken, isChecking, router]);

    if (isChecking || !user || user.role !== "admin") {
        return (
            <div className="flex flex-col gap-4 h-screen w-full justify-center items-center text-white">
                <div className="text-xl font-bold">
                    {isChecking ? "Loading admin page..." : "Pending access..."}
                </div>
                <SpinnerIcon className="w-16 h-16 animate-spin fill-white" />
            </div>
        );
    }

    return <>{children}</>;
}
