"use client";

import AdminHeader from "@/components/AdminPage/Header/AdminHeader";
import AdminNavigation from "@/components/AdminPage/Navigation/AdminNavigation";
import AccountNavigation from "@/components/UserPage/AccountNavigation/AccountNavigation";

export default function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <AccountNavigation>{children}</AccountNavigation>
        </>
    );
}
