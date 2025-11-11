export function FilterSectionSkeleton() {
    return (
        <div className="flex sm:flex-col items-center sm:items-start gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="h-[20px] w-[100px] bg-white/10 rounded animate-pulse" />

            <div className="flex flex-wrap gap-[10px] w-full">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="h-[35px] w-[80px] bg-white/10 rounded-xl animate-pulse"
                    />
                ))}
            </div>
        </div>
    );
}
