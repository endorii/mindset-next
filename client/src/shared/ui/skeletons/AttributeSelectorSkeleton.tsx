export function AttributeSelectorSkeleton({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-[30px] animate-pulse">
            <div className="font-perandory tracking-wider text-xl">
                <div className="font-perandory tracking-wider text-xl">
                    {label}:
                </div>
            </div>

            <ul className="flex flex-wrap gap-[10px]">
                {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i}>
                        <div className="px-[15px] py-[6px] bg-white/10 border border-white/5 w-[60px] h-[30px]"></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
