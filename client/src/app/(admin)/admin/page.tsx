"use client";

import HomeFastNav from "@/features/admin/components/HomeFastNav";
import HomeFastStat from "@/features/admin/components/HomeFastStat";
import HomeTodo from "@/features/admin/components/HomeTodo";
import HomeWelcomeMessage from "@/features/admin/components/HomeWelcomeMessage";
import ChartOrdersThisWeek from "@/features/admin/components/layout/ChartOrdersThisWeek";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";

function Admin() {
    const { data: user } = useCurrentUser();

    return (
        <div className="flex flex-col gap-[15px]">
            <div className="flex gap-[15px]">
                <HomeWelcomeMessage userName={user?.name} />

                <HomeFastNav />
            </div>

            <HomeFastStat />

            <div className="flex gap-[15px]">
                <ChartOrdersThisWeek />

                <HomeTodo />
            </div>
        </div>
    );
}

export default Admin;
