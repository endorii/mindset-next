"use client";

import Title from "@/features/admin/attributes/components/Title";
import { HomeFastStat, HomeTodo } from "@/features/admin/components";
import { useTodoList } from "@/features/admin/hooks/useTodo";
import { useRecentActions } from "@/features/admin/recent-actions/hooks/useRecentActions";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { AdminRecentActions } from "@/shared/components";
import { OrdersAndSalesChart } from "@/shared/components/charts";
import { LineChartSkeleton } from "@/shared/ui/skeletons";
import FastStatSkeleton from "@/shared/ui/skeletons/FastStatSkeleton";
import RecentActionsSkeleton from "@/shared/ui/skeletons/RecentActionsSkeleton";
import TodoSkeleton from "@/shared/ui/skeletons/TodoSkeleton";

function Admin() {
    const {
        data: actions,
        isPending: isActionsPending,
        isError: isActionsError,
    } = useRecentActions();
    const {
        data: orders,
        isPending: isOrdersPending,
        isError: isOrdersError,
    } = useOrders();
    const {
        data: todos,
        isPending: isTodosPending,
        isError: isTodosError,
    } = useTodoList();

    if (isActionsPending || isOrdersPending || isTodosPending) {
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

    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);

    return (
        <div className="flex flex-col gap-[15px]">
            <Title title="Головна сторінка" />
            <OrdersAndSalesChart
                orders={orders}
                isOrdersError={isOrdersError}
            />
            <HomeFastStat orders={orders} isOrdersError={isOrdersError} />

            <div className="flex lg:flex-col gap-[15px]">
                <AdminRecentActions
                    actions={actions}
                    isActionsError={isActionsError}
                />
                <HomeTodo todos={todos} isTodosError={isTodosError} />
            </div>
        </div>
    );
}

export default Admin;
