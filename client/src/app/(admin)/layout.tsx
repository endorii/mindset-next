"use client";

import AdminHeader from "@/features/admin/components/layout/AdminHeader";
import AdminNavigation from "@/features/admin/components/layout/AdminNavigation";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { SpinnerIcon } from "@/shared/icons";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect } from "react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const {
        data: user,
        isPending: isUserPending,
        isError: isUserError,
    } = useCurrentUser();

    useEffect(() => {
        if (isUserError) {
            toast.error("Помилка завантаження користувача");
            router.push("/account");
        } else if (user && user.role !== "ADMIN" && !isUserPending) {
            toast.info("У вас немає доступу до адмін панелі");
            router.push("/account");
        } else if (!user && !isUserPending) {
            toast.info("Ви не авторизовані, перенаправлення...");
            router.push("/account");
        } else if (user && user.role === "ADMIN" && !isUserPending) {
            toast.success("Ви успішно увійшли в адмін панель");
        }
    }, [user, isUserPending, isUserError, router]);

    if (isUserPending) {
        return (
            <div className="text-white flex flex-col gap-[15px] h-screen w-full justify-center items-center pb-[10%]">
                <div className="text-xl font-bold">
                    Завантаження адмін панелі...
                </div>
                <div>
                    <SpinnerIcon className="w-[70px] h-[70px] fill-white animate-spin" />
                </div>
            </div>
        );
    }

    if (!user || user.role !== "ADMIN" || isUserError) {
        return null;
    }

    return (
        <>
            <AdminHeader />
            <AdminNavigation>{children}</AdminNavigation>
        </>
    );
}
