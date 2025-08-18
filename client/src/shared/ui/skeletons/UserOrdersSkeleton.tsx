function UserOrdersSkeleton() {
    return (
        <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] xs:p-[10px]">
            <div className="border border-white/10 rounded-xl animate-pulse w-full">
                {[1, 2, 3].map((_, i) => (
                    <div
                        key={i}
                        className="relative flex gap-[40px] border-b border-white/10 last:border-b-0 p-[20px]"
                    >
                        <div className="absolute top-[20px] right-[20px] bg-white/10 rounded p-[15px] "></div>
                        <div className="flex flex-col justify-between w-[150px] gap-[15px]">
                            <div className="flex flex-col gap-[5px]">
                                <div className="bg-white/10 rounded max-w-[120px] h-[25px]"></div>
                                <div className="bg-white/10 rounded h-[25px]"></div>
                            </div>
                            <div className="bg-white/10 rounded h-[25px] max-w-[100px]"></div>
                        </div>
                        <div className="w-[120px] h-[120px] bg-white/10 rounded sm:hidden"></div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserOrdersSkeleton;
