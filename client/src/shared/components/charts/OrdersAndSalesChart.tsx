import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IOrder } from "@/features/orders/types/orders.types";
import { MONTH_NAMES } from "@/shared/constants/constants";
import { Period, PERIOD_LABELS } from "@/shared/types/chartPeriods";
import {
    endOfDay,
    endOfMonth,
    endOfYear,
    formatDate,
    getMonth,
    isWithinInterval,
    parseISO,
    startOfDay,
    startOfMonth,
    startOfYear,
    subDays,
} from "date-fns";
import { uk } from "date-fns/locale";
import { useMemo, useState } from "react";
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type ChartPoint = {
    name: string;
    Orders: number;
    Sales: number;
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
            Orders: 0,
            Sales: 0,
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
                data[hour].Orders += 1;
                data[hour].Sales += order.total;
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
                Orders: 0,
                Sales: 0,
            });
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
                    data[index].Orders += 1;
                    data[index].Sales += order.total;
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
                Orders: 0,
                Sales: 0,
            })
        );

        orders.forEach((order) => {
            const date = parseDate(order.createdAt!);
            if (isWithinInterval(date, { start, end })) {
                const day = date.getDate(); // день місяця 1..31
                data[day - 1].Orders += 1;
                data[day - 1].Sales += order.total;
            }
        });

        return data;
    }

    if (period === "year") {
        // Дані по місяцях поточного року
        const data: ChartPoint[] = Array.from({ length: 12 }, (_, i) => ({
            name: MONTH_NAMES[i],
            Orders: 0,
            Sales: 0,
        }));

        const start = startOfYear(now);
        const end = endOfYear(now);

        orders.forEach((order) => {
            const date = parseDate(order.createdAt!);
            if (isWithinInterval(date, { start, end })) {
                const month = getMonth(date); // 0-11
                data[month].Orders += 1;
                data[month].Sales += order.total;
            }
        });

        return data;
    }

    return [];
}

export function OrdersAndSalesChart({
    orders,
}: {
    orders: IOrder[] | undefined;
}) {
    const [period, setPeriod] = useState<Period>("day");

    if (!orders || orders.length === 0) {
        return (
            <div className="  bg-white/5 p-[20px] text-neutral-200 border border-white/5">
                Orders for the chart are missing.
            </div>
        );
    }

    const chartData = useMemo(
        () => generateChartData(orders, period),
        [orders, period]
    );

    return (
        <div className="flex flex-col gap-[20px] bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] w-full">
            <div className="text-3xl font-perandory tracking-wider">
                Number of orders and sales
            </div>

            <div className="flex gap-[10px] items-center">
                <div className="font-semibold">Chosen period:</div>
                <Select
                    value={period}
                    onValueChange={(v: Period) => setPeriod(v)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Period</SelectLabel>

                            <SelectItem value="day">
                                {PERIOD_LABELS.day}
                            </SelectItem>
                            <SelectItem value="week">
                                {PERIOD_LABELS.week}
                            </SelectItem>
                            <SelectItem value="month">
                                {PERIOD_LABELS.month}
                            </SelectItem>
                            <SelectItem value="year">
                                {PERIOD_LABELS.year}
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
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
                            value: "Sales",
                            angle: -90,
                            position: "insideLeft",
                        }}
                    />
                    <YAxis
                        yAxisId="right"
                        orientation="right"
                        allowDecimals={false}
                        label={{
                            value: "Orders",
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
                        dataKey="Sales"
                        stroke="#8884d8"
                        name="Sales"
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="Orders"
                        stroke="#82ca9d"
                        name="Orders quantity"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
