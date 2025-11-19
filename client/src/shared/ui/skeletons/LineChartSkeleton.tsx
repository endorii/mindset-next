export function LineChartSkeleton() {
    return (
        <div className="  bg-white/5 shadow-lg backdrop-blur-[100px] p-[20px] flex flex-col gap-[15px] w-full">
            <div className="h-6 w-1/3 bg-white/10 animate-pulse  " />

            <div className="flex flex-wrap gap-[10px] mb-[20px]">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div
                        key={i}
                        className="h-8 w-[120px] bg-white/10 animate-pulse rounded-full"
                    />
                ))}
            </div>

            <div className="h-[450px] w-full bg-white/10 animate-pulse  " />
        </div>
    );
}
