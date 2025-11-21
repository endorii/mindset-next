import { AdminAccountWrapper } from "@/features/admin/account/components/AdminAccountWrapper";
import { Title } from "@/features/admin/attributes/components/Title";

function AdminAccount() {
    return (
        <div className="flex flex-col gap-[20px]">
            <Title title="Admin page" />
            <hr className="w-full border-t border-white/10" />
            <AdminAccountWrapper />
        </div>
    );
}

export default AdminAccount;
