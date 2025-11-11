import { StatCardSkeleton } from "./StatCardSkeleton";

export function FastStatMiniSkeleton() {
    return (
        <div className="w-1/3 lg:w-full grid grid-cols-2 xxs:grid-cols-1 gap-[15px]">
            {[...Array(3)].map((_, i) => (
                <StatCardSkeleton key={i} />
            ))}
        </div>
    );
}
