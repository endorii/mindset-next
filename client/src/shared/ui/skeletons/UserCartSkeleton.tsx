export function SkeletonCartItem() {
    return (
        <div className="flex items-stretch border-b pb-[30px] rounded-xl bg-white/5 backdrop-blur-[100px] border border-white/5 p-[20px] animate-pulse">
            <div className="relative min-w-[300px]">
                <div className="rounded-xl bg-white/10 w-[300px] h-[300px]" />
            </div>

            <div className="px-[30px] flex gap-[10px] flex-col justify-between w-full">
                <div className="flex flex-col justify-between">
                    <div className="flex items-center justify-between gap-[20px]">
                        <div className="h-[32px] w-3/5 bg-white/10 rounded" />
                        <div className="h-[24px] w-[120px] bg-white/10 rounded" />
                    </div>

                    <hr className="border-t border-white/10 my-[8px]" />

                    <div className="flex flex-col items-start gap-[7px]">
                        {[1, 2, 3, 4].map((i) => (
                            <div
                                key={i}
                                className="flex gap-[7px] items-center w-full"
                            >
                                <div className="h-[18px] w-[60px] bg-white/10 rounded" />
                                <div className="h-[28px] w-[120px] bg-white/10 rounded-xl" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-between gap-[10px]">
                    <div className="h-[42px] w-full bg-white/10 rounded-xl " />
                    <div className="h-[42px] w-full bg-white/10 rounded-xl " />
                </div>
            </div>
        </div>
    );
}

export function SkeletonCartReceip() {
    return (
        <div className="w-1/3 rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] text-lg flex flex-col gap-[15px] animate-pulse">
            <div>
                <div className="h-[20px] w-[90px] bg-white/10 rounded" />
                <hr className="border-t border-white/10 my-[15px]" />
                <div className="flex flex-col gap-[15px]">
                    <div className="flex justify-between">
                        <div className="h-[18px] w-[120px] bg-white/10 rounded" />
                        <div className="h-[18px] w-[100px] bg-white/10 rounded" />
                    </div>
                    <div className="flex justify-between">
                        <div className="h-[16px] w-[120px] bg-white/10 rounded" />
                        <div className="h-[16px] w-[60px] bg-white/10 rounded" />
                    </div>
                    <div className="flex justify-between">
                        <div className="h-[16px] w-[90px] bg-white/10 rounded" />
                        <div className="h-[16px] w-[60px] bg-white/10 rounded" />
                    </div>
                    <div className="flex justify-between mt-[25px]">
                        <div className="h-[18px] w-[100px] bg-white/10 rounded" />
                        <div className="h-[18px] w-[110px] bg-white/10 rounded" />
                    </div>
                </div>
            </div>

            <div className="h-[46px] w-full rounded-xl bg-white/10" />
        </div>
    );
}

export default function UserCartSkeleton() {
    return (
        <div className="flex justify-between gap-[15px] w-full px-[30px]">
            <div className="flex flex-col gap-[15px] w-2/3 max-h-[80vh] overflow-y-auto">
                {[1, 2].map((i) => (
                    <SkeletonCartItem key={i} />
                ))}
            </div>

            <SkeletonCartReceip />
        </div>
    );
}
