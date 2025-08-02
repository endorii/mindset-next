import { IOrder } from "@/features/orders/types/orders.types";
import StatCard from "@/shared/components/cards/StatCard";

function HomeFastStat({ orders }: { orders: IOrder[] }) {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[20px]">
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

export default HomeFastStat;
