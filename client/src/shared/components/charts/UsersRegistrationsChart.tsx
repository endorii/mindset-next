import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IUser } from "@/features/shop/user-info/types/user.types";
import { MONTH_NAMES } from "@/shared/constants/monthsNames";
import { Period, PERIOD_LABELS } from "@/shared/types/chartPeriods";
import {
    endOfDay,
    endOfMonth,
    endOfYear,
    format,
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
    users: number;
};

function parseDate(date: string | Date) {
    return typeof date === "string" ? parseISO(date) : date;
}

function generateUsersChartData(users: IUser[], period: Period): ChartPoint[] {
    const now = new Date();

    if (period === "day") {
        // по годинах сьогодні
        const data: ChartPoint[] = Array.from({ length: 24 }, (_, i) => ({
            name: `${i.toString().padStart(2, "0")}:00`,
            users: 0,
        }));

        users.forEach((user) => {
            const date = parseDate(user.createdAt);
            if (
                isWithinInterval(date, {
                    start: startOfDay(now),
                    end: endOfDay(now),
                })
            ) {
                const hour = date.getHours();
                data[hour].users += 1;
            }
        });

        return data;
    }

    if (period === "week") {
        // по днях останніх 7 днів включно сьогодні
        const data: ChartPoint[] = [];
        for (let i = 6; i >= 0; i--) {
            const day = subDays(now, i);
            data.push({
                name: format(day, "EEE dd.MM", { locale: uk }),
                users: 0,
            });
        }

        users.forEach((user) => {
            const date = parseDate(user.createdAt);
            if (
                isWithinInterval(date, {
                    start: startOfDay(subDays(now, 6)),
                    end: endOfDay(now),
                })
            ) {
                const index = data.findIndex(
                    (d) => d.name === format(date, "EEE dd.MM", { locale: uk })
                );
                if (index !== -1) data[index].users += 1;
            }
        });

        return data;
    }

    if (period === "month") {
        // по днях місяця
        const start = startOfMonth(now);
        const end = endOfMonth(now);
        const daysInMonth = end.getDate();

        const data: ChartPoint[] = Array.from(
            { length: daysInMonth },
            (_, i) => ({
                name: `${(i + 1).toString().padStart(2, "0")}.${(
                    start.getMonth() + 1
                )
                    .toString()
                    .padStart(2, "0")}`,
                users: 0,
            })
        );

        users.forEach((user) => {
            const date = parseDate(user.createdAt);
            if (isWithinInterval(date, { start, end })) {
                const day = date.getDate();
                data[day - 1].users += 1;
            }
        });

        return data;
    }

    if (period === "year") {
        const data: ChartPoint[] = Array.from({ length: 12 }, (_, i) => ({
            name: MONTH_NAMES[i],
            users: 0,
        }));

        const start = startOfYear(now);
        const end = endOfYear(now);

        users.forEach((user) => {
            const date = parseDate(user.createdAt);
            if (isWithinInterval(date, { start, end })) {
                const month = getMonth(date);
                data[month].users += 1;
            }
        });

        return data;
    }

    return [];
}

export function UsersRegistrationsChart({
    users,
}: {
    users: IUser[] | undefined;
}) {
    const [period, setPeriod] = useState<Period>("day");

    if (!users || users.length === 0) {
        return (
            <div className="  bg-white/5 p-[20px] w-full text-neutral-200 border border-white/5">
                There are no users for the chart.
            </div>
        );
    }

    const chartData = useMemo(
        () => generateUsersChartData(users, period),
        [users, period]
    );

    return (
        <div className="  bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[10px] w-full">
            <div className="text-3xl font-perandory tracking-wider">
                User registration statistics
            </div>
            <div className="flex gap-[10px] items-center justify-end">
                <div className="font-semibold">Chosen:</div>
                <Select
                    value={period}
                    onValueChange={(v: Period) => setPeriod(v)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>

                    <SelectContent>
                        <SelectGroup>
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
                        allowDecimals={false}
                        label={{
                            value: "Quantity of users",
                            angle: -90,
                            position: "insideLeft",
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
                        type="monotone"
                        dataKey="users"
                        stroke="#82ca9d"
                        name="Registrations"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
