"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { IProduct } from "@/features/products/types/products.types";

interface SliderWrapperProps {
    productsList: IProduct[];
    title: string;
    emptyProductsTitle: string;
}

function SliderWrapper({
    productsList,
    title,
    emptyProductsTitle,
}: SliderWrapperProps) {
    return (
        <div className="p-[30px] text-white">
            {productsList && productsList.length > 0 ? (
                <div className="flex flex-col gap-[20px]">
                    <div className="text-2xl font-semibold">{title}</div>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
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
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 15,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 15,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 15,
                            },
                            1280: {
                                slidesPerView: 5,
                                spaceBetween: 15,
                            },
                        }}
                        className="w-full"
                    >
                        {productsList.map((product) => (
                            <SwiperSlide key={product.id}>
                                <Link
                                    href={`/${product.category?.collection?.path}/${product.category?.path}/${product.path}`}
                                    className="relative flex flex-col gap-[15px] group rounded-xl bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px] h-full"
                                >
                                    <div className="absolute flex text-white w-full h-full justify-center items-center bg-black/80 z-10 top-0 left-0 rounded-xl font-thin p-[20px] text-3xl opacity-0 group-hover:opacity-100 transition-all duration-400">
                                        Переглянути
                                    </div>
                                    <div className="relative">
                                        <Image
                                            className="relative rounded-xl w-full"
                                            width={400}
                                            height={300}
                                            src={`http://localhost:5000/${product.banner}`}
                                            alt={product.name}
                                            style={{ objectFit: "cover" }}
                                        />
                                        <ul className="absolute top-[15px] left-[15px] flex gap-[5px] rounded-[50px] bg-white/5 backdrop-blur-lg border border-white/20 p-[5px]">
                                            {product.productColors.map(
                                                (color) => (
                                                    <li
                                                        key={
                                                            color.color.hexCode
                                                        }
                                                        className="rounded-[50px] w-[20px] h-[20px]"
                                                        style={{
                                                            backgroundColor:
                                                                color.color
                                                                    .hexCode,
                                                        }}
                                                    ></li>
                                                )
                                            )}
                                        </ul>
                                    </div>

                                    <div className="flex flex-col gap-[7px] flex-grow">
                                        <div className="flex flex-col gap-[10px] flex-wrap">
                                            <div className="text-white text-3xl font-thin">
                                                {product.name}
                                            </div>
                                            <div className="flex gap-[10px]">
                                                <div className="text-lg text-white font-semibold">
                                                    {product.price} грн.
                                                </div>
                                                {product.oldPrice && (
                                                    <div className="font-semibold line-through text-sm text-gray-500">
                                                        {product.oldPrice} грн.
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div
                                            className={`text-sm ${
                                                product.available
                                                    ? "text-green-600"
                                                    : "text-red-500"
                                            }`}
                                        >
                                            {product.available
                                                ? "В наявності"
                                                : "Немає в наявності"}
                                        </div>

                                        <hr className="border-top border-white/10 mt-[5px]" />
                                        <div className="flex flex-col gap-[3px] text-white justify-between mt-auto">
                                            {product.productSizes.length >
                                                0 && (
                                                <ul className="flex gap-[5px] flex-wrap">
                                                    {product.productSizes.map(
                                                        (size) => (
                                                            <li
                                                                key={
                                                                    size.size
                                                                        .name
                                                                }
                                                                className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[5px] text-xs"
                                                            >
                                                                <div>
                                                                    {
                                                                        size
                                                                            .size
                                                                            .name
                                                                    }
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                            {product.productTypes.length >
                                                0 && (
                                                <ul className="flex gap-[5px] flex-wrap">
                                                    {product.productTypes.map(
                                                        (type) => (
                                                            <li
                                                                key={
                                                                    type.type
                                                                        .name
                                                                }
                                                                className="text-white rounded-xl bg-black/80 shadow-lg backdrop-blur-lg border border-white/5 px-[15px] py-[5px] text-xs"
                                                            >
                                                                <div>
                                                                    {
                                                                        type
                                                                            .type
                                                                            .name
                                                                    }
                                                                </div>
                                                            </li>
                                                        )
                                                    )}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            ) : (
                <p>{emptyProductsTitle}</p>
            )}
        </div>
    );
}

export default SliderWrapper;
