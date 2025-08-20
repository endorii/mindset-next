"use client";

import Title from "@/features/admin/attributes/components/Title";
import { HomeFastStat, HomeTodo } from "@/features/admin/components";
import { useRecentActions } from "@/features/admin/recent-actions/hooks/useRecentActions";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { AdminRecentActions } from "@/shared/components";
import { OrdersAndSalesChart } from "@/shared/components/charts";
import { LineChartSkeleton } from "@/shared/ui/skeletons";
import FastStatSkeleton from "@/shared/ui/skeletons/FastStatSkeleton";
import RecentActionsSkeleton from "@/shared/ui/skeletons/RecentActionsSkeleton";
import TodoSkeleton from "@/shared/ui/skeletons/TodoSkeleton";

function Admin() {
    const {
        data: user,
        isPending: isUserPending,
        isError: isUserError,
    } = useCurrentUser();
    const {
        data: actions,
        isPending: isActionsPending,
        isError: isActionsError,
    } = useRecentActions(user?.id);
    const {
        data: orders,
        isPending: isOrdersPending,
        isError: isOrdersError,
    } = useOrders();

    if (isUserPending || isActionsPending || isOrdersPending) {
        return (
            <div className="flex flex-col gap-[15px]">
                <Title title="Головна сторінка" />
                <LineChartSkeleton />
                <FastStatSkeleton />
                <div className="flex lg:flex-col gap-[15px]">
                    <RecentActionsSkeleton />
                    <TodoSkeleton />
                </div>
            </div>
        );
    }

    if (!orders || !user || !actions) return;

    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);

    return (
        <div className="flex flex-col gap-[15px]">
            <Title title="Головна сторінка" />
            <OrdersAndSalesChart orders={orders} />
            <HomeFastStat orders={orders} />

            <div className="flex lg:flex-col gap-[15px]">
                <AdminRecentActions actions={actions} />
                <HomeTodo />
            </div>
        </div>
    );
}

export default Admin;
