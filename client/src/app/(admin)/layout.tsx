import { AdminWrapper } from "@/features/admin/components/AdminWrapper";
import { AdminHeader } from "@/features/admin/components/layout/AdminHeader";
import { AdminNavigation } from "@/features/admin/components/layout/AdminNavigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AdminWrapper>
            <AdminHeader />
            <AdminNavigation>{children}</AdminNavigation>
        </AdminWrapper>
    );
}
