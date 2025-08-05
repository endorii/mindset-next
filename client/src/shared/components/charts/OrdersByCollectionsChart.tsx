import { useMemo } from "react";
import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";
import { IOrder } from "@/features/orders/types/orders.types";

const PIE_COLORS = [
    "#F0F0E0",
    "#C8B490",
    "#7D5A47",
    "#A7D9A7",
    "#6FA38B",
    "#4B7850",
];

function OrdersByCollectionsChart({ orders }: { orders: IOrder[] }) {
    if (!orders) return null;

    const collectionSalesData = useMemo(() => {
        const collectionMap: Record<string, number> = {};

        orders.forEach((order) => {
            order.items.forEach((item) => {
                const collectionName =
                    item.product?.category?.collection?.name || "Інше";
                const total = (item.product?.price || 0) * item.quantity;

                if (collectionMap[collectionName]) {
                    collectionMap[collectionName] += total;
                } else {
                    collectionMap[collectionName] = total;
                }
            });
        });

        return Object.entries(collectionMap).map(([name, value]) => ({
            name,
            value,
        }));
    }, [orders]);

    return (
        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[15px] w-2/3 lg:w-full">
            <h2 className="text-lg font-semibold">
                Розподіл продажів за колекціями товарів
            </h2>
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        data={collectionSalesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) =>
                            `${name} ${(percent! * 100).toFixed(0)}%`
                        }
                    >
                        {collectionSalesData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={PIE_COLORS[index % PIE_COLORS.length]}
                                stroke="none"
                            />
                        ))}
                    </Pie>
                    <Tooltip
                        formatter={(value) => `${value} грн`}
                        contentStyle={{
                            backgroundColor: "black",
                            border: "1px solid #ffffff20",
                            borderRadius: "5px",
                            padding: "10px",
                        }}
                        itemStyle={{
                            color: "white",
                            fontWeight: "normal",
                        }}
                    />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default OrdersByCollectionsChart;
