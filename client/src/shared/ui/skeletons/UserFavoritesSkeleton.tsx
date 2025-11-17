function SkeletonFavoriteCard() {
    return (
        <li className="relative bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] animate-pulse">
            <div className="flex flex-col gap-[15px]">
                <div className="w-full aspect-square bg-white/10" />

                <div className="flex justify-between items-center flex-wrap gap-[10px]">
                    <div className="h-[28px] w-1/2 bg-white/10 rounded" />
                    <div className="flex gap-[10px]">
                        <div className="h-[24px] w-[80px] bg-white/10 rounded" />
                        <div className="h-[20px] w-[70px] bg-white/10 rounded" />
                    </div>
                </div>
            </div>
        </li>
    );
}

export function UserFavoritesSkeleton() {
    return (
        <ul className="grid grid-cols-4 2xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-full gap-[15px] px-[30px]">
            {[1, 2, 3].map((i) => (
                <SkeletonFavoriteCard key={i} />
            ))}
        </ul>
    );
}
