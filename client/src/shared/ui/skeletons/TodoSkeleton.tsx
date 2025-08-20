export default function TodoSkeleton() {
    const rows = Array.from({ length: 5 });

    return (
        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] p-[20px] flex flex-col gap-[15px] w-1/2 lg:w-full">
            <div className="flex gap-[15px] justify-between items-center">
                <div className="h-6 w-1/3 bg-white/10 animate-pulse rounded-md" />
                <div className="h-8 w-[140px] bg-white/10 animate-pulse rounded-full" />
            </div>

            <div className="flex flex-col gap-[10px] max-h-[470px] overflow-y-auto">
                {rows.map((_, i) => (
                    <div
                        key={i}
                        className="h-20 bg-white/10 animate-pulse rounded-xl w-full"
                    />
                ))}
            </div>
        </div>
    );
}
