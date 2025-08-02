interface StatCardProps {
    title: string;
    value: string | number;
}

export default function StatCard({ title, value }: StatCardProps) {
    return (
        <div className="flex flex-col gap-[5px] justify-center items-center bg-white/5 border border-white/10 text-white shadow-md rounded-2xl p-4 text-center h-full">
            <p className="text-sm text-white/80">{title}</p>
            <p className="text-2xl font-bold ">{value}</p>
        </div>
    );
}
