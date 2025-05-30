"use client";

import AdminHeader from "@/components/AdminPage/Header/AdminHeader";
import AdminNavigation from "@/components/AdminPage/Navigation/AdminNavigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AdminHeader />
            <AdminNavigation>{children}</AdminNavigation>
        </>
    );
}
