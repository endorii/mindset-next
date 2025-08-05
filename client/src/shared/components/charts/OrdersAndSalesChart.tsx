import { IOrder } from "@/features/orders/types/orders.types";
import { ChooseButton } from "@/shared/ui/buttons";
import {
    parseISO,
    isWithinInterval,
    startOfDay,
    endOfDay,
    subDays,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    getMonth,
    formatDate,
} from "date-fns";
import { uk } from "date-fns/locale";
import { useState, useMemo } from "react";
import {
    ResponsiveContainer,
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
} from "recharts";

const monthNames = [
    "Січ",
    "Лют",
    "Бер",
    "Кві",
    "Тра",
    "Чер",
    "Лип",
    "Сер",
    "Вер",
    "Жов",
    "Лис",
    "Гру",
];

type Period = "day" | "week" | "month" | "year";

type ChartPoint = {
    name: string;
    Замовлення: number;
    Продажі: number;
};

function parseDate(date: string | Date) {
    return typeof date === "string" ? parseISO(date) : date;
}

function generateChartData(orders: IOrder[], period: Period): ChartPoint[] {
    const now = new Date();

    if (period === "day") {
        // Дані по годинах сьогодні
        const data: ChartPoint[] = Array.from({ length: 24 }, (_, i) => ({
            name: `${i.toString().padStart(2, "0")}:00`,
            Замовлення: 0,
            Продажі: 0,
        }));

        orders.forEach((order) => {
            const date = parseDate(order.createdAt!);
            if (
                isWithinInterval(date, {
                    start: startOfDay(now),
                    end: endOfDay(now),
                })
            ) {
                const hour = date.getHours();
                data[hour].Замовлення += 1;
                data[hour].Продажі += order.total;
            }
        });

        return data;
    }

    if (period === "week") {
        // Дані по днях за останні 7 днів включно сьогодні
        const data: ChartPoint[] = [];
        for (let i = 6; i >= 0; i--) {
            const day = subDays(now, i);
            data.push({
                name: formatDate(day, "EEE dd.MM", { locale: uk }),
                Замовлення: 0,
                Продажі: 0,
            }); // Наприклад: Пн 31.07
        }

        orders.forEach((order) => {
            const date = parseDate(order.createdAt!);
            if (
                isWithinInterval(date, {
                    start: startOfDay(subDays(now, 6)),
                    end: endOfDay(now),
                })
            ) {
                const index = data.findIndex(
                    (d) => d.name === formatDate(date, "EEE dd.MM")
                );
                if (index !== -1) {
                    data[index].Замовлення += 1;
                    data[index].Продажі += order.total;
                }
            }
        });

        return data;
    }

    if (period === "month") {
        const start = startOfMonth(now);
        const end = endOfMonth(now);
        const daysInMonth = end.getDate();

        // Масив для кожного дня місяця
        const data: ChartPoint[] = Array.from(
            { length: daysInMonth },
            (_, i) => ({
                name: `${(i + 1).toString().padStart(2, "0")}.${(
                    start.getMonth() + 1
                )
                    .toString()
                    .padStart(2, "0")}`, // формат: "01.08", "02.08" і т.д.
                Замовлення: 0,
                Продажі: 0,
            })
        );

        orders.forEach((order) => {
            const date = parseDate(order.createdAt!);
            if (isWithinInterval(date, { start, end })) {
                const day = date.getDate(); // день місяця 1..31
                data[day - 1].Замовлення += 1;
                data[day - 1].Продажі += order.total;
            }
        });

        return data;
    }

    if (period === "year") {
        // Дані по місяцях поточного року
        const data: ChartPoint[] = Array.from({ length: 12 }, (_, i) => ({
            name: monthNames[i],
            Замовлення: 0,
            Продажі: 0,
        }));

        const start = startOfYear(now);
        const end = endOfYear(now);

        orders.forEach((order) => {
            const date = parseDate(order.createdAt!);
            if (isWithinInterval(date, { start, end })) {
                const month = getMonth(date); // 0-11
                data[month].Замовлення += 1;
                data[month].Продажі += order.total;
            }
        });

        return data;
    }

    return [];
}

function OrdersAndSalesChart({ orders }: { orders: IOrder[] }) {
    const [period, setPeriod] = useState<Period>("day");

    const chartData = useMemo(
        () => generateChartData(orders, period),
        [orders, period]
    );

    const periodLabels: Record<Period, string> = {
        day: "За день (по годинах)",
        week: "За тиждень (по днях)",
        month: "За місяць (по тижнях)",
        year: "За рік (по місяцях)",
    };

    return (
        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[15px] w-full">
            <h2 className="text-lg font-semibold">
                Кількість замовлень та продажі {periodLabels[period]}
            </h2>
            <div className="flex flex-wrap gap-[10px] mb-[20px]">
                {(["day", "week", "month", "year"] as Period[]).map((p) => (
                    <ChooseButton
                        key={p}
                        onClick={() => setPeriod(p)}
                        isActive={p === period}
                    >
                        {periodLabels[p]}
                    </ChooseButton>
                ))}
            </div>
            <ResponsiveContainer width="100%" height={450}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis dataKey="name" />
                    <YAxis
                        yAxisId="left"
                        orientation="left"
                        allowDecimals={false}
                        label={{
                            value: "Продажі",
                            angle: -90,
                            position: "insideLeft",
                        }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        allowDecimals={false}
                        label={{
                            value: "Замовлень",
                            angle: 90,
                            position: "insideRight",
                        }}
                    />
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
                        yAxisId="left"
                        type="monotone"
                        dataKey="Продажі"
                        stroke="#8884d8"
                        name="Продажі"
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="Замовлення"
                        stroke="#82ca9d"
                        name="Кількість замовлень"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default OrdersAndSalesChart;
