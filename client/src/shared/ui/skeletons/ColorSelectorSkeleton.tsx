import JustColorsSkeleton from "./JustColorsSkeleton";

export function ColorSelectorSkeleton() {
    return (
        <div className="flex flex-wrap gap-[10px] items-center animate-pulse">
            <div className="flex gap-[30px] items-center">
                <div className="font-perandory tracking-wider text-xl">
                    Color:
                </div>

                <JustColorsSkeleton />
            </div>

            <div className="flex gap-[10px] items-center">
                <div className="text-xs text-neutral-400">Chosen color:</div>
                <div className="w-[80px] h-[20px] bg-white/10"></div>
            </div>
        </div>
    );
}
