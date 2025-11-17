export function ProductReviewsSkeleton({ items = 2 }) {
    return (
        <div className="flex sm:flex-col gap-[30px] mt-[15px] animate-pulse">
            <div className="flex flex-col gap-[15px] w-1/3 sm:w-full">
                <div className="flex items-center gap-[10px] mb-[10px]">
                    <div className="h-4 w-40 bg-white/10 rounded" />
                    <div className="h-5 w-16 bg-white/10 rounded" />
                </div>

                <div className="flex flex-col gap-[10px]">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <div
                            key={rating}
                            className="flex items-center gap-[10px] mb-1"
                        >
                            <span className="w-[20px] h-[20px] text-sm bg-white/10 rounded"></span>
                            <div className="flex-1 border border-white/10 rounded h-5 overflow-hidden">
                                <div
                                    className="bg-white/10 h-full"
                                    style={{ width: `${rating + 4}0%` }}
                                />
                            </div>
                            <div className="h-4 w-6 bg-white/10 rounded" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-[10px] w-2/3 sm:w-full">
                {Array.from({ length: items }).map((_, i) => (
                    <div
                        key={i}
                        className="flex flex-col gap-[15px] bg-white/5 rounded-lg p-[20px] shadow-sm"
                    >
                        <div className="flex justify-between mb-1">
                            <div className="h-4 w-20 bg-white/10 rounded"></div>
                            <div className="h-3 w-16 bg-white/10 rounded"></div>
                        </div>

                        <div className="flex gap-1 mb-2">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <div
                                    key={j}
                                    className="h-5 w-5 bg-white/10 rounded"
                                ></div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <div className="h-3 w-full bg-white/10 rounded"></div>
                            <div className="h-3 w-2/3 bg-white/10 rounded"></div>
                        </div>

                        <div className="flex gap-[10px] mt-3">
                            <div className="h-8 w-16 bg-white/10 rounded-xl"></div>
                            <div className="h-8 w-16 bg-white/10 rounded-xl"></div>
                        </div>

                        {i === 0 && (
                            <div className="flex flex-col gap-[10px] bg-white/5 rounded-lg p-[15px]">
                                <div className="flex justify-between text-sm">
                                    <div className="h-3 w-32 bg-white/10 rounded"></div>
                                    <div className="h-3 w-16 bg-white/10 rounded"></div>
                                </div>
                                <div className="h-3 w-2/3 bg-white/10 rounded"></div>
                            </div>
                        )}
                    </div>
                ))}

                <div className="h-4 w-32 bg-white/10 rounded self-start mt-2"></div>
            </div>
        </div>
    );
}
