"use client";

import HomeFastNav from "@/features/admin/components/HomeFastNav";
import HomeFastStat from "@/features/admin/components/HomeFastStat";
import HomeTodo from "@/features/admin/components/HomeTodo";
import HomeWelcomeMessage from "@/features/admin/components/HomeWelcomeMessage";
import { useRecentActions } from "@/features/admin/recent-actions/hooks/useRecentActions";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { useOrders } from "@/features/orders/hooks/useOrders";
import AdminRecentActions from "@/shared/components/AdminRecentActions";
import StatCard from "@/shared/components/cards/StatCard";
import OrdersAndSalesChart from "@/shared/components/charts/OrdersAndSalesChart";

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
            <h1 className="text-2xl md:text-3xl font-semibold">
                Головна сторінка
            </h1>

            {orders && <OrdersAndSalesChart orders={orders} />}
            <HomeFastStat orders={orders} />
            <div className="flex gap-[20px]">
                <AdminRecentActions actions={actions} />
                <HomeTodo />
            </div>
        </div>
    );
}

export default Admin;
