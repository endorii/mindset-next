import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Bar,
} from "recharts";

function ChartOrdersThisWeek() {
    const dailyOrdersData = [
        { name: "Пн", Замовлення: 120 },
        { name: "Вт", Замовлення: 150 },
        { name: "Ср", Замовлення: 130 },
        { name: "Чт", Замовлення: 180 },
        { name: "Пт", Замовлення: 200 },
        { name: "Сб", Замовлення: 220 },
        { name: "Нд", Замовлення: 100 },
    ];

    return (
        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[15px] w-3/5 min-h-[400px]">
            <h2>Кількість замовлень за днями тижня</h2>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyOrdersData}>
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
                    <Bar
                        dataKey="Замовлення"
                        fill="#82ca9d"
                        barSize={50}
                        activeBar={{ fill: "#82ca9d" }}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default ChartOrdersThisWeek;
