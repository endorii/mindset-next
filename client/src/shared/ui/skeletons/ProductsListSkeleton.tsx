export function SkeletonProductCard() {
    return (
        <div className="w-full">
            <div className="relative flex flex-col gap-[10px] bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px] animate-pulse">
                <div className="relative w-full aspect-square bg-white/10" />

                <ul className="absolute top-[30px] left-[30px] flex gap-[5px]  backdrop-blur-lg p-[5px]">
                    {[1, 2, 3].map((i) => (
                        <li
                            key={i}
                            className="rounded-full w-[20px] h-[20px] bg-white/5"
                        />
                    ))}
                </ul>

                <div className="flex flex-col gap-[3px]">
                    <div className="flex flex-col gap-[10px] flex-wrap">
                        <div className="h-[28px] w-3/5 bg-white/10" />
                        <div className="flex gap-[10px]">
                            <div className="h-[22px] w-[80px] bg-white/10" />
                            <div className="h-[20px] w-[70px] bg-white/10" />
                        </div>
                    </div>

                    <div className="h-[16px] w-[100px] bg-white/10" />

                    <hr className="border-t border-white/5 mt-[5px]" />

                    <div className="flex flex-col gap-[5px]">
                        <ul className="flex gap-[5px] flex-wrap">
                            {[1, 2, 3].map((i) => (
                                <li
                                    key={i}
                                    className="h-[24px] w-[50px] bg-white/10  "
                                />
                            ))}
                        </ul>
                        <ul className="flex gap-[5px] flex-wrap">
                            {[1, 2].map((i) => (
                                <li
                                    key={i}
                                    className="h-[24px] w-[60px] bg-white/10  "
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ProductsListSkeleton() {
    return (
        <ul className="grid gap-[15px] w-full px-[30px] grid-cols-4 2xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {Array.from({ length: 8 }).map((_, i) => (
                <SkeletonProductCard key={i} />
            ))}
        </ul>
    );
}
