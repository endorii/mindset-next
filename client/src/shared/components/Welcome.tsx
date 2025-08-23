"use client";

import { useTypewriter } from "../hooks";

function Welcome() {
    const text = "mindset.";
    const typedText = useTypewriter(text, 160);

    return (
        <div className="relative">
            <div className="relative flex flex-col text-white h-screen justify-center items-center pb-[150px]">
                <div className="overflow-hidden text-[400px] 2xl:text-[340px] xl:text-[280px] lg:text-[230px] md:text-[180px] sm:text-[110px] xs:text-[80px] xxs:text-[70px] font-extrabold uppercase tracking-[-0.05em] leading-[350px] 2xl:leading-[290px] xl:leading-[240px] lg:leading-[190px] md:leading-[150px] sm:leading-[100px] ">
                    {typedText}

                    {text === typedText ? null : (
                        <span className="animate-pulse text-[400px] 2xl:text-[340px] xl:text-[280px] lg:text-[230px] md:text-[180px] sm:text-[130px] xs:text-[80px] xxs:text-[70px] font-thin">
                            |
                        </span>
                    )}
                </div>

                <div
                    className={`text-center w-full text-5xl xl:text-4xl md:text-3xl xs:text-2xl font-qwitcher-grypen font-light self-start justify-start transition-all duration-450 ${
                        typedText === text ? "opacity-100" : "opacity-0"
                    }`}
                >
                    your style - your life vision
                </div>
            </div>
        </div>
    );
}

export default Welcome;
