"use client";

import MyChart from "@/features/admin/components/MyChart";
import { CartIcon } from "@/shared/icons";
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    BarChart,
    Bar,
    Cell, // Для кольорів у PieChart
} from "recharts";

// --- Фейкові дані для графіків ---

// 1. Дані для продажів за місяцями (LineChart)
const monthlySalesData = [
    { name: "Січ", Продажі: 4000, Замовлення: 240 },
    { name: "Лют", Продажі: 3000, Замовлення: 139 },
    { name: "Бер", Продажі: 2000, Замовлення: 980 },
    { name: "Кві", Продажі: 2780, Замовлення: 390 },
    { name: "Тра", Продажі: 1890, Замовлення: 480 },
    { name: "Чер", Продажі: 2390, Замовлення: 380 },
    { name: "Лип", Продажі: 3490, Замовлення: 430 },
    { name: "Сер", Продажі: 4200, Замовлення: 500 },
    { name: "Вер", Продажі: 3800, Замовлення: 450 },
    { name: "Жов", Продажі: 4500, Замовлення: 550 },
    { name: "Лис", Продажі: 5000, Замовлення: 600 },
    { name: "Гру", Продажі: 6000, Замовлення: 700 },
];

// 2. Дані для розподілу продажів за категоріями (PieChart)
const categorySalesData = [
    { name: "Футболки", value: 400 },
    { name: "Джинси", value: 300 },
    { name: "Сукні", value: 300 },
    { name: "Верхній одяг", value: 200 },
    { name: "Аксесуари", value: 278 },
    { name: "Взуття", value: 189 },
];
const PIE_COLORS = [
    "#F0F0E0", // Off-white (м'який, майже кремовий білий)
    "#C8B490", // Muted Tan (приглушений світло-коричневий)
    "#7D5A47", // Desaturated Brown (ненасичений, м'який коричневий)
    "#A7D9A7", // Pastel Green (пастельний, дуже ніжний зелений)
    "#6FA38B", // Sage Green (шавлієвий зелений, спокійний)
    "#4B7850", // Forest Green (глибокий, але приглушений лісовий зелений)
];

function AdminStats() {
    return (
        <div className="flex flex-col gap-[15px]">
            <div className="flex gap-[15px] justify-between items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="text-2xl font-bold">
                    Аналітика та статистика магазину
                </div>
            </div>
            {/* --- Графік продажів за місяцями --- */}
            <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[15px]">
                <h2>Продажі та замовлення за останні 12 місяців</h2>
                <ResponsiveContainer width="100%" height={450}>
                    <LineChart data={monthlySalesData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            strokeOpacity={0.2}
                        />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" />
                        <YAxis yAxisId="right" orientation="right" />
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
                        />
                        <Line
                            yAxisId="right"
                            type="monotone"
                            dataKey="Замовлення"
                            stroke="#82ca9d"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
            <div>
                <div className="flex gap-[15px]">
                    <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex gap-[70px] items-center">
                        <div className="flex flex-col gap-[3px]">
                            <div>Сьогоднішні продажі</div>
                            <div className="flex gap-[15px] items-end">
                                <div className="text-2xl font-semibold">
                                    $9,000
                                </div>
                                <div className="text-sm text-green-500 mb-[2px]">
                                    +0%
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                            <CartIcon className="w-[25px] stroke-white " />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex gap-[70px] items-center">
                        <div className="flex flex-col gap-[3px]">
                            <div>Сьогоднішні відвідувачі</div>
                            <div className="flex gap-[15px] items-end">
                                <div className="text-2xl font-semibold">
                                    120
                                </div>
                                <div className="text-sm text-green-500 mb-[2px]">
                                    +0%
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                            <CartIcon className="w-[25px] stroke-white " />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex gap-[70px] items-center">
                        <div className="flex flex-col gap-[3px]">
                            <div>Нових користувачів</div>
                            <div className="flex gap-[15px] items-end">
                                <div className="text-2xl font-semibold">23</div>
                                <div className="text-sm text-green-500 mb-[2px]">
                                    +0%
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                            <CartIcon className="w-[25px] stroke-white " />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex gap-[70px] items-center">
                        <div className="flex flex-col gap-[3px]">
                            <div>Загальних переглядів товарів</div>
                            <div className="flex gap-[15px] items-end">
                                <div className="text-2xl font-semibold">
                                    591
                                </div>
                                <div className="text-sm text-green-500 mb-[2px]">
                                    +0%
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                            <CartIcon className="w-[25px] stroke-white" />
                        </div>
                    </div>
                    <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex gap-[70px] items-center">
                        <div className="flex flex-col gap-[3px]">
                            <div>Сьогоднішні замовлення</div>
                            <div className="flex gap-[15px] items-end">
                                <div className="text-2xl font-semibold">68</div>
                                <div className="text-sm text-green-500 mb-[2px]">
                                    +0%
                                </div>
                            </div>
                        </div>
                        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                            <CartIcon className="w-[25px] stroke-white " />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-[15px] w-full justify-between">
                {/* --- Розподіл продажів за категоріями --- */}
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[15px] w-1/2">
                    <h2>Розподіл продажів за категоріями товарів</h2>
                    <ResponsiveContainer width="100%" height={350}>
                        <PieChart>
                            <Pie
                                data={categorySalesData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                nameKey="name" // Дозволяє Tooltip відображати назву категорії
                                label={({ name, percent }) =>
                                    `${name} ${(percent! * 100).toFixed(0)}%`
                                }
                            >
                                {categorySalesData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={
                                            PIE_COLORS[
                                                index % PIE_COLORS.length
                                            ]
                                        }
                                        stroke="none"
                                    />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value) => `${value} од.`} // Форматуємо значення
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
                {/* --- Кількість замовлень за днями тижня --- */}
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[15px] w-1/2">
                    <h2>Кількість замовлень за днями тижня</h2>
                    <MyChart />
                </div>
            </div>
        </div>
    );
}

export default AdminStats;
