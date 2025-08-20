export default function PieChartSkeleton() {
    return (
        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex flex-col gap-[15px] w-2/3 lg:w-full">
            <div className="h-[25px] w-1/3 bg-white/10 rounded animate-pulse mb-5"></div>
            <div className="h-[350px] bg-white/10 rounded animate-pulse"></div>
        </div>
    );
}
