// shared/ui/skeletons/CheckoutSkeleton.tsx

"use client";

function CheckoutSkeleton() {
    return (
        <div className="flex flex-col gap-[20px] text-white animate-pulse">
            <div className="px-[30px]">
                <div className="h-[70px] w-3/4 bg-white/10 rounded mb-2"></div>
                <div className="h-[30px] w-3/4 bg-white/10 rounded"></div>
            </div>

            <div className="flex justify-between px-[30px] gap-[15px]">
                <div className="flex flex-col gap-[20px] w-1/2 bg-white/10 p-[30px] border border-white/5 rounded-xl">
                    <div className="flex gap-[15px] w-full">
                        <div className="w-1/2">
                            <div className="h-[36px] w-3/4 bg-white/10 rounded mb-[30px]"></div>
                            <div className="flex flex-col gap-[10px]">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        className="flex flex-col gap-[8px]"
                                        key={i}
                                    >
                                        <div className="h-[20px] w-1/2 bg-white/10 rounded"></div>
                                        <div className="h-[43px] w-full bg-white/10 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="h-[36px] w-3/4 bg-white/10 rounded mb-[30px]"></div>
                            <div className="flex flex-col gap-[10px]">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        className="flex flex-col gap-[8px]"
                                        key={i}
                                    >
                                        <div className="h-[20px] w-1/2 bg-white/10 rounded"></div>
                                        <div className="h-[43px] w-full bg-white/10 rounded"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className=" flex flex-col gap-[8px] w-full bg-white/5 rounded p-[20px]">
                        <div className="h-[60px] w-full bg-white/5 rounded"></div>
                        <div className="h-[24px] w-full bg-white/5 rounded"></div>
                    </div>
                </div>

                <div className="flex flex-col gap-[15px] w-1/2 rounded-xl bg-white/10 border border-white/5 p-[30px]">
                    <div className="h-[36px] w-3/4 bg-white/10 rounded mb-[30px]"></div>
                    <div className="flex flex-col gap-[10px]">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="h-8 w-full bg-white/10 rounded"
                            ></div>
                        ))}
                    </div>

                    <div className="h-10 w-full bg-white/10 rounded mt-4"></div>
                    <div className="h-12 w-40 bg-white/10 rounded self-end"></div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutSkeleton;
