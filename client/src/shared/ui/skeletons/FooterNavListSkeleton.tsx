export function FooterNavListSkeleton() {
    return (
        <div className="flex flex-col gap-[15px] w-full animate-pulse">
            <div className="h-6 w-32 bg-white/10"></div>

            <div className="flex flex-col gap-[10px]">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-4 w-24 bg-white/10"></div>
                ))}
            </div>
        </div>
    );
}
