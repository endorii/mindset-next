import React, { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";

const realOrders = [
    { createdAt: "2025-07-17T00:10:00Z" },
    { createdAt: "2025-07-17T00:45:00Z" },
    { createdAt: "2025-07-17T01:15:00Z" },
    { createdAt: "2025-07-17T02:05:00Z" },
    { createdAt: "2025-07-17T02:30:00Z" },
    { createdAt: "2025-07-17T03:00:00Z" },
    { createdAt: "2025-07-17T03:55:00Z" },
    { createdAt: "2025-07-17T08:00:00Z" },
    { createdAt: "2025-07-17T08:30:00Z" },
    { createdAt: "2025-07-17T12:00:00Z" },
    { createdAt: "2025-07-17T12:15:00Z" },
    { createdAt: "2025-07-17T16:00:00Z" },
    { createdAt: "2025-07-17T18:00:00Z" },
    { createdAt: "2025-07-17T23:00:00Z" },
    { createdAt: "2025-07-17T23:30:00Z" },
];

export default function MyChart({ orders = realOrders }) {
    const [chartData, setChartData] = useState<
        { name: string; value: number }[]
    >([]);

    useEffect(() => {
        const hourlyData = Array.from({ length: 24 }, (_, i) => ({
            name: `${i.toString().padStart(2, "0")}:00`,
            value: 0,
        }));

        orders.forEach((order) => {
            const date = new Date(order.createdAt);
            const hour = date.getHours();

            if (hour >= 0 && hour < 24) {
                hourlyData[hour].value++;
            }
        });

        setChartData(hourlyData);
    }, [orders]);

    return (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                    contentStyle={{
                        backgroundColor: "black",
                        border: "1px solid #ffffff20",
                        borderRadius: "5px",
                        padding: "10px",
                    }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Кількість замовлень"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
