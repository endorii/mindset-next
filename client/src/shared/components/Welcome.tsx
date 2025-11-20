import Image from "next/image";

export function Welcome() {
    const text = "MINDSET";

    return (
        <div className="relative flex flex-col h-screen justify-center items-center pb-[100px]">
            <div className="relative text-white ">
                <div className="relative overflow-hidden text-[350px] 2xl:text-[340px] xl:text-[280px] lg:text-[230px] md:text-[180px] sm:text-[110px] xs:text-[80px] xxs:text-[70px] font-perandory uppercase leading-[350px] 2xl:leading-[340px] xl:leading-[280px] lg:leading-[230px] md:leading-[180px] sm:leading-[150px] ">
                    {text}
                </div>

                <div
                    className={`absolute bottom-5 text-center w-full text-7xl xl:text-4xl md:text-3xl xs:text-2xl font-ballet font-light self-start justify-start transition-all duration-450 opacity-100 text-neutral-300 z-1`}
                >
                    your style - your life vision
                </div>
            </div>
            <Image
                src={"/lamp.png"}
                alt="lamp"
                width={400}
                height={400}
                className="absolute w-[300px] xl:w-[250px] lg:w-[200px] md:w-[150px] sm:w-[150px] xs:w-[100px] rotate-20 z-[-1] right-[5%] top-[50%]"
            />
        </div>
    );
}
