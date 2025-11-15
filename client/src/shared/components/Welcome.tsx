export function Welcome() {
    const text = "MINDSET";

    return (
        <div className="relative flex flex-col h-screen justify-center items-center">
            <div className="relative text-white ">
                <div className="relative overflow-hidden text-[350px] 2xl:text-[340px] xl:text-[280px] lg:text-[230px] md:text-[180px] sm:text-[110px] xs:text-[80px] xxs:text-[70px] font-perandory uppercase leading-[350px]">
                    {text}
                </div>

                <div
                    className={`absolute bottom-2 text-center w-full text-8xl xl:text-4xl md:text-3xl xs:text-2xl font-ballet font-light self-start justify-start transition-all duration-450 opacity-100 text-white/20 z-1`}
                >
                    your style - your life vision
                </div>
            </div>
        </div>
    );
}
