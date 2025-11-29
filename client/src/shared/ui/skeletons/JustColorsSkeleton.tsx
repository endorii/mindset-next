export function JustColorsSkeleton() {
    return (
        <ul className="flex flex-wrap gap-[10px]">
            {Array.from({ length: 5 }).map((_, i) => (
                <li key={i}>
                    <div className="w-[25px] h-[25px] bg-white/10 border border-white/5"></div>
                </li>
            ))}
        </ul>
    );
}
