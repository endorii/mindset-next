export function FilterSectionSkeleton() {
    return (
        <div className="flex items-center sm:flex-col gap-[15px] py-[20px]">
            <div className="h-[20px] w-[100px] bg-white/10 animate-pulse" />

            <div className="flex flex-wrap gap-[10px] w-full">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="h-[35px] w-[80px] bg-white/10 animate-pulse"
                    />
                ))}
            </div>
        </div>
    );
}
