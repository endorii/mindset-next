import { IOrder } from "@/features/orders/types/orders.types";
import { StatCard } from "@/shared/components/cards/StatCard";

interface OrdersStatsCardsProps {
    totalOrders: number;
    paidOrders: IOrder[];
    unpaidOrders: IOrder[];
    cancelledOrders: IOrder[];
    totalSales: number;
    avgCheck: string;
    ordersLastWeek: IOrder[];
    conversionRate: string;
}

export function OrdersStatsCards({
    totalOrders,
    paidOrders,
    unpaidOrders,
    cancelledOrders,
    totalSales,
    avgCheck,
    ordersLastWeek,
    conversionRate,
}: OrdersStatsCardsProps) {
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
