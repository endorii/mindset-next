import StatCardSkeleton from "./StatCardSkeleton";

export default function FastStatSkeleton() {
    const cards = Array.from({ length: 8 });

    return (
        <div className="grid grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 xxs:grid-cols-1 gap-[15px]">
            {cards.map((_, i) => (
                <div
                    key={i}
                    className="h-24 bg-white/5 animate-pulse rounded-xl"
                >
                    <StatCardSkeleton />
                </div>
            ))}
        </div>
    );
}
