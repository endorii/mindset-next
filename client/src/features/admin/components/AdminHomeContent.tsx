"use client";

import { useOrders } from "@/features/orders/hooks/useOrders";
import { AdminRecentActions } from "@/shared/components";
import { OrdersAndSalesChart } from "@/shared/components/charts";
import { useTodoList } from "../hooks/useTodo";
import { useRecentActions } from "../recent-actions/hooks/useRecentActions";
import { HomeFastStat } from "./HomeFastStat";
import { HomeTodo } from "./HomeTodo";

export function AdminHomeContent() {
    const { data: actions } = useRecentActions();
    const { data: orders } = useOrders();
    const { data: todos } = useTodoList();

    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);

    return (
        <>
            <OrdersAndSalesChart orders={orders} />
            <HomeFastStat orders={orders} />

            <div className="flex lg:flex-col gap-[15px]">
                <AdminRecentActions actions={actions} />
                <HomeTodo todos={todos} />
            </div>
        </>
    );
}
