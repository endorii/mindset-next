export function AdminProductsSkeleton() {
    return (
        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[10px] pt-0 text-sm">
            <div
                className="grid 
                grid-cols-[120px_0.5fr_0.5fr_0.5fr_0.5fr_1fr] 
                xl:grid-cols-[120px_0.5fr_0.5fr_0.5fr_1fr] 
                lg:grid-cols-4
                sm:grid-cols-3
                xs:grid-cols-2
                gap-[15px] p-[20px] sm:p-[10px] rounded-t-lg font-semibold"
            >
                <div className="h-[18px] w-[80px] bg-white/10 rounded animate-pulse" />
                <div className="h-[18px] w-[60px] bg-white/10 rounded animate-pulse xs:hidden" />
                <div className="h-[18px] w-[90px] bg-white/10 rounded animate-pulse sm:hidden" />
                <div className="h-[18px] w-[120px] bg-white/10 rounded animate-pulse xl:hidden" />
                <div className="h-[18px] w-[70px] bg-white/10 rounded animate-pulse xs:hidden" />
                <div className="h-[18px] w-[50px] bg-white/10 rounded animate-pulse lg:hidden ml-auto" />
            </div>

            <div className="border border-white/10 rounded-xl">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-[25px] p-[20px] border-b border-white/10 last:border-b-0 text-sm"
                    >
                        <div
                            className="grid 
                            grid-cols-[120px_0.5fr_0.5fr_0.5fr_0.5fr_1fr] 
                            xl:grid-cols-[120px_0.5fr_0.5fr_0.5fr_1fr] 
                            lg:grid-cols-4 
                            sm:grid-cols-3
                            xs:grid-cols-2
                            gap-[15px] items-center"
                        >
                            <div className="h-[80px] w-full bg-white/10 rounded animate-pulse" />
                            <div className="h-[20px] w-[120px] bg-white/10 rounded animate-pulse" />
                            <div className="h-[20px] w-[80px] bg-white/10 rounded animate-pulse sm:hidden" />
                            <div className="h-[20px] w-[150px] bg-white/10 rounded animate-pulse xl:hidden" />
                            <div className="h-[20px] w-[90px] bg-white/10 rounded animate-pulse xs:hidden mx-auto" />
                            <div className="flex gap-[10px] justify-end lg:hidden">
                                {[...Array(4)].map((_, j) => (
                                    <div
                                        key={j}
                                        className="h-[30px] w-[30px] bg-white/10 rounded-full animate-pulse"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
