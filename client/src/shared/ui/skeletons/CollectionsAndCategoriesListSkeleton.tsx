function CollectionsAndCategoriesListSkeleton() {
    return (
        <div className="flex w-full">
            <div className="flex flex-col py-[10px] gap-[25px] w-full animate-pulse">
                <div className="flex items-center md:justify-center gap-[10px] h-[750px] w-full bg-white/10 rounded pl-[9%] md:p-0">
                    <div className="h-[50px] w-1/4 bg-white/10 rounded-xl" />
                </div>
                <div className="flex items-center justify-end md:justify-center gap-[10px] h-[750px] w-full bg-white/10 rounded pr-[9%] md:p-0">
                    <div className="h-[50px] w-1/4 bg-white/10 rounded-xl" />
                </div>
                <div className="flex items-center md:justify-center gap-[10px] h-[750px] w-full bg-white/10 rounded pl-[9%] md:p-0">
                    <div className="h-[50px] w-1/4 bg-white/10 rounded-xl" />
                </div>
            </div>
        </div>
    );
}

export default CollectionsAndCategoriesListSkeleton;
