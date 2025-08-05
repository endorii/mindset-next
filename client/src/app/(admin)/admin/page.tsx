"use client";

import { HomeFastStat, HomeTodo } from "@/features/admin/components";
import { useRecentActions } from "@/features/admin/recent-actions/hooks/useRecentActions";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { AdminRecentActions } from "@/shared/components";
import { OrdersAndSalesChart } from "@/shared/components/charts";

function Admin() {
    const { data: user } = useCurrentUser();
    const { data: actions } = useRecentActions(user?.id);
    const { data: orders } = useOrders();

    if (!orders || !user || !actions) return;

    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);

    return (
        <div className="flex flex-col gap-[15px]">
            <h1 className="text-3xl font-semibold">Головна сторінка</h1>

            {orders && <OrdersAndSalesChart orders={orders} />}
            <HomeFastStat orders={orders} />
            <div className="flex lg:flex-col gap-[20px]">
                <AdminRecentActions actions={actions} />
                <HomeTodo />
            </div>
        </div>
    );
}

export default Admin;
