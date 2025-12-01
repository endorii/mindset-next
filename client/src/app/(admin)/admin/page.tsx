"use client";
import { AdminHomeWrapper } from "@/features/admin/components";
import { Title } from "@/shared/components";

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
