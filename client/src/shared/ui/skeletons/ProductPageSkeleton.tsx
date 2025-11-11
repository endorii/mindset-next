export function ProductPageSkeleton() {
    return (
        <div className="flex lg:flex-col gap-[15px] items-start text-white animate-pulse">
            <div className="flex xl:flex-col gap-[10px] relative rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 max-h-[80vh] xl:max-h-[90vh] xl:w-full w-[55%]">
                <div className="relative w-[85%] xl:w-full">
                    <div className="rounded-xl w-full h-[80vh] xl:max-h-[70vh] bg-white/10"></div>
                </div>
                <div className="flex flex-col xl:flex-row gap-[10px] w-[15%] xl:w-full xl:h-[150px] overflow-hidden">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="rounded-xl w-full h-[100px] bg-white/10"
                        ></div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-[15px] w-[45%] lg:w-full">
                <div className="flex flex-col gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[40px] xl:p-[15px] py-[20px]">
                    <div className="w-[150px] h-[20px] bg-white/10 rounded"></div>
                    <div className="w-[60%] h-[40px] bg-white/10 rounded"></div>

                    <div className="flex gap-[15px] items-center mt-[10px]">
                        <div className="w-[100px] h-[25px] bg-white/10 rounded"></div>
                        <div className="w-[80px] h-[20px] bg-white/10 rounded"></div>
                    </div>

                    <div className="w-[120px] h-[20px] bg-white/10 rounded"></div>

                    <div className="mt-[20px] xl:mt-[10px] w-full h-[80px] bg-white/10 rounded"></div>
                    <hr className="w-full border-white/10 border-t " />
                    <div className="w-full h-[50px] bg-white/10 rounded"></div>

                    <div className="flex flex-col gap-[20px] mt-[30px] text-sm">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="w-full h-[30px] bg-white/10 rounded"
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="flex md:flex-col justify-between gap-[10px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[10px]">
                    <div className="w-full h-[50px] bg-white/10 rounded"></div>
                    <div className="w-full h-[50px] bg-white/10 rounded"></div>
                </div>
            </div>
        </div>
    );
}
