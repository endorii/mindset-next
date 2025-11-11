import { Title } from "@/features/admin/attributes/components/Title";
import { AdminHomeWrapper } from "@/features/admin/components/AdminHomeWrapper";

function Admin() {
    return (
        <div className="flex flex-col gap-[15px]">
            <Title title="Головна сторінка" />
            <AdminHomeWrapper />
        </div>
    );
}

export default Admin;
