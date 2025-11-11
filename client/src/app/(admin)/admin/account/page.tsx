import { AdminAccountWrapper } from "@/features/admin/account/components/AdminAccountWrapper";
import { Title } from "@/features/admin/attributes/components/Title";

function AdminAccount() {
    return (
        <div className="flex flex-col gap-[15px]">
            <Title title="Акаунт адміністратора" />
            <AdminAccountWrapper />
        </div>
    );
}

export default AdminAccount;
