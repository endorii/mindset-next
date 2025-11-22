import { Title } from "@/features/admin/attributes/components/Title";
import { AdminHomeWrapper } from "@/features/admin/components/AdminHomeWrapper";

function Admin() {
    return (
        <div className="flex flex-col gap-[20px]">
            <Title title="Main page" />
            <hr className="w-full border-t border-white/5" />
            <AdminHomeWrapper />
        </div>
    );
}

export default Admin;
