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
import {
    parseISO,
    startOfDay,
    endOfDay,
    isWithinInterval,
    subDays,
    format,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    getMonth,
} from "date-fns";
import { uk } from "date-fns/locale";
import ChooseButton from "@/shared/ui/buttons/ChooseButton";
import { IUser } from "@/features/shop/user-info/types/user.types";

type Period = "day" | "week" | "month" | "year";

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
        // по місяцях року
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

        const data: ChartPoint[] = Array.from({ length: 12 }, (_, i) => ({
            name: monthNames[i],
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

function UsersRegistrationChart({ users }: { users: IUser[] }) {
    const [period, setPeriod] = useState<Period>("day");

    const chartData = useMemo(
        () => generateUsersChartData(users, period),
        [users, period]
    );

    const periodLabels: Record<Period, string> = {
        day: "За день (по годинах)",
        week: "За тиждень (по днях)",
        month: "За місяць (по днях)",
        year: "За рік (по місяцях)",
    };

    return (
        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[15px] w-full">
            <h2 className="text-lg font-semibold">
                Статистика реєстрацій користувачів {periodLabels[period]}
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
                        allowDecimals={false}
                        label={{
                            value: "Кількість користувачів",
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
                        name="Реєстрації"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default UsersRegistrationChart;
