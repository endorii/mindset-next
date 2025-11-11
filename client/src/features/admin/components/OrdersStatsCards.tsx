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
            <StatCard
                title="Загальна кількість замовлень"
                value={totalOrders}
            />
            <StatCard title="Успішні замовлення" value={paidOrders.length} />
            <StatCard
                title="Незакінчені замовлення"
                value={unpaidOrders.length}
            />
            <StatCard
                title="Відмінені замовлення"
                value={cancelledOrders.length}
            />
            <StatCard
                title="Сума продажів"
                value={totalSales.toFixed(2) + " ₴"}
            />
            <StatCard title="Середній чек" value={avgCheck + " ₴"} />
            <StatCard
                title="Замовлення за останній тиждень"
                value={ordersLastWeek.length}
            />
            <StatCard
                title="Конверсія замовлень"
                value={conversionRate + " %"}
            />
        </div>
    );
}
