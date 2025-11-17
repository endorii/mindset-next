export function ColorsSkeleton() {
    return (
        <div className="rounded-xl bg-white/5 shadow-lg border border-white/5 p-[20px] sm:px-[10px] pt-0 animate-pulse">
            <div
                className="grid 
                grid-cols-4 
                md:grid-cols-3 
                xs:grid-cols-2 
                gap-[15px] p-[20px] font-semibold text-sm"
            >
                <div className="xs:hidden h-4 w-12 bg-white/10 rounded" />
                <div className="h-4 w-16 bg-white/10 rounded" />
                <div className="md:hidden h-4 w-12 bg-white/10 rounded" />
                <div className="h-4 w-10 bg-white/10 justify-self-end" />
            </div>

            <div className="border border-white/10 rounded-xl">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="grid 
                            grid-cols-4 
                            md:grid-cols-3 
                            xs:grid-cols-2 
                            gap-[15px] p-[20px] border-b border-white/10 items-center text-sm"
                    >
                        <div className="border border-white/10 w-[52px] h-[52px] xs:hidden bg-white/10" />
                        <div className="h-4 w-24 bg-white/10 rounded" />
                        <div className="md:hidden h-4 w-16 bg-white/10 rounded" />
                        <div className="flex justify-end gap-[10px]">
                            <div className="w-[30px] h-[30px] bg-white/10 rounded" />
                            <div className="w-[30px] h-[30px] bg-white/10 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
