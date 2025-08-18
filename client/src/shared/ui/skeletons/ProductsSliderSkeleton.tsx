"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function ProductsSliderSkeleton({ slides = 5 }) {
    return (
        <div className="p-[30px] sm:p-[10px] text-white">
            <div className="flex flex-col gap-[15px]">
                <div className="h-8 w-1/4 bg-white/10 rounded animate-pulse"></div>
                <Swiper spaceBetween={20} slidesPerView={1}>
                    {Array.from({ length: slides }).map((_, i) => (
                        <SwiperSlide key={i}>
                            <div className="relative flex flex-col gap-[15px] group rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px] animate-pulse h-[400px]">
                                {/* Банер */}
                                <div className="relative w-full h-[200px] bg-white/10 rounded-xl" />
                                {/* Кольори */}
                                <ul className="absolute top-[15px] left-[15px] flex gap-[5px] rounded-[50px] bg-white/5 backdrop-blur-lg border border-white/20 p-[5px]">
                                    {Array.from({ length: 3 }).map((_, j) => (
                                        <li
                                            key={j}
                                            className="rounded-[50px] w-[20px] h-[20px] bg-white/10"
                                        ></li>
                                    ))}
                                </ul>
                                {/* Назва та ціна */}
                                <div className="flex flex-col gap-[10px] mt-auto">
                                    <div className="h-6 w-3/4 bg-white/10 rounded"></div>
                                    <div className="flex gap-[10px]">
                                        <div className="h-5 w-1/4 bg-white/10 rounded"></div>
                                        <div className="h-4 w-1/6 bg-white/10 rounded"></div>
                                    </div>
                                    {/* Наявність */}
                                    <div className="h-4 w-1/3 bg-white/10 rounded mt-2"></div>
                                    {/* Розміри та типи */}
                                    <div className="flex flex-wrap gap-[5px] mt-2">
                                        {Array.from({ length: 2 }).map(
                                            (_, k) => (
                                                <div
                                                    key={k}
                                                    className="h-5 w-10 bg-white/10 rounded-xl"
                                                ></div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default ProductsSliderSkeleton;
