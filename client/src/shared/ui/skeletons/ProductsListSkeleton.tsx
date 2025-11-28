export function SkeletonProductCard() {
    return (
        <div className="w-full">
            <div className="relative flex flex-col gap-[10px] bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 animate-pulse">
                <div className="relative w-full aspect-square bg-white/10 h-[400px]" />

                <ul className="absolute top-[10px] left-[10px] flex gap-[5px] border border-white/10 p-[2px]">
                    {[1, 2, 3].map((i) => (
                        <li key={i} className="w-[25px] h-[25px] bg-white/5" />
                    ))}
                </ul>

                <div className="flex flex-col gap-[3px] px-[10px] pb-[5px]">
                    <div className="flex flex-col gap-[3px] flex-wrap">
                        <div className="h-[36px] w-3/5 bg-white/10" />
                        <div className="flex justify-between gap-[10px]">
                            <div className="h-[28px] w-[50px] bg-white/10" />
                            <div className="h-[28px] w-[70px] bg-white/10" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ProductsListSkeleton() {
    return (
        <ul className="grid gap-[15px] px-[30px] grid-cols-4 2xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {Array.from({ length: 2 }).map((_, i) => (
                <SkeletonProductCard key={i} />
            ))}
        </ul>
    );
}
