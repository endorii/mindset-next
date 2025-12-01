import { AdminAccountWrapper } from "@/features/admin/account/components/AdminAccountWrapper";
import { Title } from "@/shared/components";

function AdminAccount() {
    return (
        <div className="flex flex-col gap-[20px]">
            <Title title="Admin page" />
            <hr className="w-full border-t border-white/5" />
            <AdminAccountWrapper />
        </div>
    );
}

export default AdminAccount;
