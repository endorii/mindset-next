export function RecentActionsSkeleton() {
    const rows = Array.from({ length: 5 });

    return (
        <div className="flex flex-col gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] p-[20px] w-full">
            <div className="flex gap-[15px] items-center justify-between">
                <div className="h-6 w-3/4 bg-white/10 animate-pulse rounded-md" />
                <div className="h-4 w-[200px] bg-white/10 animate-pulse rounded-md mt-[3px]" />
            </div>

            <div className="flex flex-col gap-[7px] max-h-[470px] overflow-y-auto">
                {rows.map((_, i) => (
                    <div
                        key={i}
                        className="h-12 bg-white/10 animate-pulse rounded-md"
                    />
                ))}
            </div>
        </div>
    );
}
