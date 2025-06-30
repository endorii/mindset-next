"use client";

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
