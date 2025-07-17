"use client";

import MyChart from "@/features/admin/components/MyChart";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import {
    CartIcon,
    CategoriesIcon,
    EditIcon,
    PlusIcon,
    TrashIcon,
} from "@/shared/icons";
import ButtonWithIcon from "@/shared/ui/buttons/ButtonWithIcon";
import DeleteButtonWithIcon from "@/shared/ui/buttons/DeleteButtonWithIcon";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import { formatDate } from "@/shared/utils/formatDate";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

function Admin() {
    const data = [
        {
            id: "1",
            title: "Завершити адмін-панель",
            priority: "Високий",
            createdAt: "2025-07-10T12:00:00.000Z",
            updatedAt: "2025-07-15T15:30:00.000Z",
        },
        {
            id: "2",
            title: "Додати авторизацію",
            priority: "Середній",
            createdAt: "2025-07-11T09:00:00.000Z",
            updatedAt: "2025-07-16T18:45:00.000Z",
        },
        {
            id: "3",
            title: "Перевірити валідацію форм",
            priority: "Ньзький",
            createdAt: "2025-07-13T08:00:00.000Z",
            updatedAt: "2025-07-17T10:00:00.000Z",
        },
        {
            id: "14",
            title: "Завершити адмін-панель",
            priority: "Високий",
            createdAt: "2025-07-10T12:00:00.000Z",
            updatedAt: "2025-07-15T15:30:00.000Z",
        },
        {
            id: "25",
            title: "Додати авторизацію",
            priority: "Середній",
            createdAt: "2025-07-11T09:00:00.000Z",
            updatedAt: "2025-07-16T18:45:00.000Z",
        },
        {
            id: "36",
            title: "Перевірити валідацію форм",
            priority: "Ньзький",
            createdAt: "2025-07-13T08:00:00.000Z",
            updatedAt: "2025-07-17T10:00:00.000Z",
        },
        {
            id: "17",
            title: "Завершити адмін-панель",
            priority: "Високий",
            createdAt: "2025-07-10T12:00:00.000Z",
            updatedAt: "2025-07-15T15:30:00.000Z",
        },
        {
            id: "28",
            title: "Додати авторизацію",
            priority: "Середній",
            createdAt: "2025-07-11T09:00:00.000Z",
            updatedAt: "2025-07-16T18:45:00.000Z",
        },
        {
            id: "39",
            title: "Перевірити валідацію форм",
            priority: "Ньзький",
            createdAt: "2025-07-13T08:00:00.000Z",
            updatedAt: "2025-07-17T10:00:00.000Z",
        },
    ];

    // 3. Дані для кількості замовлень за днями тижня (BarChart)
    const dailyOrdersData = [
        { name: "Пн", Замовлення: 120 },
        { name: "Вт", Замовлення: 150 },
        { name: "Ср", Замовлення: 130 },
        { name: "Чт", Замовлення: 180 },
        { name: "Пт", Замовлення: 200 },
        { name: "Сб", Замовлення: 220 },
        { name: "Нд", Замовлення: 100 },
    ];

    const { data: user } = useCurrentUser();

    return (
        <div className="flex flex-col gap-[15px]">
            <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[4px]">
                <div className="text-3xl font-light">Вітаю, {user?.name}</div>
                <div className="text-xl font-light">З поверненням!</div>
            </div>
            <div className="flex gap-[15px]">
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex gap-[70px] items-center">
                    <div className="flex flex-col gap-[3px]">
                        <div>Сьогоднішні продажі</div>
                        <div className="flex gap-[15px] items-end">
                            <div className="text-2xl font-semibold">$9,000</div>
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
                            <div className="text-2xl font-semibold">120</div>
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
                            <div className="text-2xl font-semibold">591</div>
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

            <div className="flex gap-[15px]">
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[15px] w-3/5">
                    <h2>Кількість замовлень за днями тижня</h2>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailyOrdersData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                strokeOpacity={0.2}
                            />
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
                            <Bar
                                dataKey="Замовлення"
                                fill="#82ca9d"
                                barSize={50}
                                activeBar={{ fill: "#82ca9d" }}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[15px] w-2/5">
                    <div className="flex gap-[15px] justify-between">
                        <div className="text-xl font-semibold">ToDo</div>
                        <MonoButton onClick={() => {}}>
                            <div>Додати завдання</div>
                            <PlusIcon className="stroke-white stroke-2 w-[30px] group-hover:stroke-black" />
                        </MonoButton>
                    </div>
                    {(data ?? []).length > 0 ? (
                        <div className="space-y-4 max-h-[470px] overflow-y-auto">
                            {data.map((task) => (
                                <div
                                    key={task.id}
                                    className={`flex items-center justify-between p-4 rounded-xl border border-white/10 shadow-md ${
                                        task.priority === "Високий"
                                            ? "bg-red-900/10"
                                            : task.priority === "Середній"
                                            ? "bg-yellow-900/10"
                                            : "bg-green-900/10"
                                    }`}
                                >
                                    <div className="flex flex-col">
                                        <span className="text-base font-medium text-white">
                                            {task.title}
                                        </span>
                                        <span className="text-sm text-white/70">
                                            Пріоритет: {task.priority}
                                        </span>
                                        <span className="text-xs text-white/50 mt-1">
                                            {formatDate(task.createdAt)} /{" "}
                                            {formatDate(task.updatedAt)}
                                        </span>
                                    </div>
                                    <div className="flex gap-3 mt-1">
                                        <ButtonWithIcon onClick={() => {}}>
                                            <EditIcon className="w-[24px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                        </ButtonWithIcon>
                                        <DeleteButtonWithIcon
                                            onClick={() => {}}
                                        >
                                            <TrashIcon className="w-[28px] stroke-white stroke-[1.7] fill-none" />
                                        </DeleteButtonWithIcon>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-white/70">Завдання відсутні</div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Admin;
