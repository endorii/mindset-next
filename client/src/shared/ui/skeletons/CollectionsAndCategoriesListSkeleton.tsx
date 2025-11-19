export function CollectionsAndCategoriesListSkeleton() {
    return (
        <div className="flex w-full">
            <div className="flex flex-col gap-[25px] w-full animate-pulse">
                <div className="flex items-center md:justify-center gap-[10px] h-[750px] w-full bg-white/10 pl-[9%] md:p-0">
                    <div className="h-[50px] w-1/4 bg-white/10  " />
                </div>
                <div className="flex items-center justify-end md:justify-center gap-[10px] h-[750px] w-full bg-white/10 pr-[9%] md:p-0">
                    <div className="h-[50px] w-1/4 bg-white/10  " />
                </div>
                <div className="flex items-center md:justify-center gap-[10px] h-[750px] w-full bg-white/10 pl-[9%] md:p-0">
                    <div className="h-[50px] w-1/4 bg-white/10  " />
                </div>
            </div>
        </div>
    );
}
