"use client";

import { AccountNavigation } from "@/shared/components/layout";

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
