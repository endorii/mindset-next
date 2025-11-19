export function MainInfoSkeleton() {
    return (
        <div className="flex flex-col py-[10px] gap-[25px] w-full animate-pulse">
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
        </div>
    );
}
