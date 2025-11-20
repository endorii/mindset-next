"use client";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { ProductCard } from "@/features/products/components/ProductCard";
import { IProduct } from "@/features/products/types/products.types";

interface SliderWrapperProps {
    productsList: IProduct[];
    title: string;
}

export function SliderWrapper({ productsList, title }: SliderWrapperProps) {
    return (
        <div className="p-[30px] sm:p-[10px] text-white">
            <div className="flex flex-col gap-[10px]">
                <div className="text-4xl font-perandory tracking-wider">
                    {title}
                </div>

                <Swiper
                    spaceBetween={20}
                    slidesPerView={1.5}
                    modules={[Navigation, Pagination, Autoplay]}
                    navigation={true}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true,
                    }}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        480: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                        1280: {
                            slidesPerView: 4,
                        },
                        1440: {
                            slidesPerView: 5,
                        },
                    }}
                    className="w-full"
                >
                    {productsList.map((product) => (
                        <SwiperSlide key={product.id}>
                            <ProductCard
                                product={product}
                                path={`/${product.category?.collection?.path}/${product.category?.path}/${product.path}`}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
