import { getCurrentUserSSR } from "@/shared/api/authFetch.api";
import { AccountNavigation } from "@/shared/components/layout";
import { redirect } from "next/navigation";

export default async function AccountLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user } = await getCurrentUserSSR();

    if (!user) {
        redirect("/auth");
    }

    return <AccountNavigation>{children}</AccountNavigation>;
}
