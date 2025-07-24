"use client";

import AccountNavigation from "@/shared/components/layout/AccountNavigation";

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
