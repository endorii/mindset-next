export function DeliveryAddressSkeleton() {
    return (
        <div className="flex w-full">
            <div className="grid grid-cols-2 xl:grid-cols-1 py-[10px] gap-[25px] w-full animate-pulse">
                <div className="flex flex-col gap-[10px]">
                    <div className="h-[25px] w-1/4 bg-white/10" />
                    <div className="h-[25px] w-full bg-white/10" />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <div className="h-[25px] w-1/5 bg-white/10" />
                    <div className="h-[25px] w-full bg-white/10" />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <div className="h-[25px] w-1/4 bg-white/10" />
                    <div className="h-[25px] w-full bg-white/10" />
                </div>
                <div className="flex flex-col gap-[10px]">
                    <div className="h-[25px] w-1/4 bg-white/10" />
                    <div className="h-[25px] w-full bg-white/10" />
                </div>
            </div>
        </div>
    );
}
