export default function StatCardSkeleton() {
    return (
        <div className="flex flex-col gap-[5px] justify-center items-center bg-white/5 text-white shadow-md rounded-2xl p-[20px] text-center h-full">
            <div className="h-4 w-3/4 bg-white/10 animate-pulse rounded-md mb-2" />
            <div className="h-8 w-1/2 bg-white/10 animate-pulse rounded-md" />
        </div>
    );
}
