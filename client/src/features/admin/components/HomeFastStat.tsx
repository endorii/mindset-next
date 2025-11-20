import { IOrder } from "@/features/orders/types/orders.types";
import { StatCard } from "@/shared/components/cards/StatCard";

export function HomeFastStat({ orders }: { orders: IOrder[] | undefined }) {
    if (!orders || orders.length === 0) {
        return (
            <div className="  bg-white/5 p-[20px] text-neutral-200 border border-white/5">
                There are no orders for quick statistics.
            </div>
        );
    }

    const totalOrders = orders.length;
    const paidOrders = orders.filter(
        (o) => o.status === "paid" || o.status === "delivered"
    );
    const unpaidOrders = orders.filter(
        (o) => o.status !== "paid" && o.status !== "delivered"
    );
    const cancelledOrders = orders.filter((o) => o.status === "cancelled");
    const totalSales = paidOrders.reduce((sum, order) => sum + order.total, 0);
    const avgCheck = paidOrders.length
        ? (totalSales / paidOrders.length).toFixed(2)
        : "0";
    const now = new Date();
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    const ordersLastWeek = orders.filter(
        (o) =>
            new Date(o.createdAt!) >= weekAgo && new Date(o.createdAt!) <= now
    );
    const conversionRate = totalOrders
        ? ((paidOrders.length / totalOrders) * 100).toFixed(2)
        : "0";
    return (
        <div className="grid grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 xxs:grid-cols-1 gap-[15px]">
            <StatCard title="Total number of orders" value={totalOrders} />
            <StatCard title="Successful orders" value={paidOrders.length} />
            <StatCard title="Unfinished orders" value={unpaidOrders.length} />
            <StatCard title="Cancelled orders" value={cancelledOrders.length} />
            <StatCard
                title="Sales amount"
                value={"$" + totalSales.toFixed(2)}
            />
            <StatCard title="Average check" value={"$" + avgCheck} />
            <StatCard
                title="Orders for the last week"
                value={ordersLastWeek.length}
            />
            <StatCard title="Order conversion" value={conversionRate + " %"} />
        </div>
    );
}
