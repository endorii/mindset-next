export function SizesAndTypesSkeleton({
    rowsCount = 5,
}: {
    rowsCount?: number;
}) {
    return (
        <div className="  bg-white/5 shadow-lg border border-white/5 p-[20px] sm:px-[10px] pt-0 animate-pulse">
            <div
                className="grid 
                grid-cols-2 
                gap-[15px] p-[20px] font-semibold text-sm"
            >
                <div className="h-4 w-20 bg-white/10" />
                <div className="h-4 w-10 bg-white/10 justify-self-end" />
            </div>

            <div className="border border-white/10  ">
                {Array.from({ length: rowsCount }).map((_, i) => (
                    <div
                        key={i}
                        className="grid 
                            grid-cols-2 
                            gap-[15px] p-[20px] border-b border-white/10 items-center text-sm"
                    >
                        <div className="h-4 w-28 bg-white/10" />

                        <div className="flex justify-end gap-[10px]">
                            <div className="w-[30px] h-[30px] bg-white/10" />
                            <div className="w-[30px] h-[30px] bg-white/10" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
