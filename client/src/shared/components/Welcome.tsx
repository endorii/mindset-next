export function Welcome() {
    const text = "MINDSET";

    return (
        <div className="relative flex flex-col h-screen justify-center items-center pb-[100px] overflow-hidden">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="/video.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-black/40 z-0" />

            <div className="relative text-white z-10">
                <div className="relative overflow-hidden text-[350px] 2xl:text-[340px] xl:text-[280px] lg:text-[230px] md:text-[180px] sm:text-[110px] xs:text-[80px] xxs:text-[70px] font-perandory uppercase leading-[350px] 2xl:leading-[340px] xl:leading-[280px] lg:leading-[230px] md:leading-[180px] sm:leading-[150px]">
                    {text}
                </div>

                <div className="absolute bottom-5 text-center w-full text-5xl xl:text-4xl md:text-3xl xs:text-2xl font-ballet font-light text-neutral-400 z-10">
                    your style - your life vision
                </div>
            </div>
        </div>
    );
}
