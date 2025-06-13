"use client";

import { formatDate } from "@/lib/helpers/formatDate";
import { ICategory } from "@/types/category/category.types";
import { ICollection } from "@/types/collection/collection.types";
import { IProduct } from "@/types/product/product.types";
import Image from "next/image";
import { createPortal } from "react-dom";

export interface ProductInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionPath?: ICollection["path"];
    categoryPath?: ICategory["path"];
    product: IProduct;
}

export default function ProductInfoModal({
    isOpen,
    onClose,
    collectionPath,
    categoryPath,
    product,
}: ProductInfoModalProps) {
    if (!isOpen || !product) return null;

    const modalContent = (
        <div className="fixed inset-0 bg-black/70 flex items-center products-center justify-center z-100">
            <div className="bg-white p-[40px] h-[95vh] shadow-lg w-[80vw] overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">
                    Інформація про товар: {product.name || "Без назви"}
                </h2>
                <div className="flex gap-[20px] justify-between">
                    <div className="flex flex-col gap-[20px] w-1/3">
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="name">Назва:</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {product.name}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="path">Шлях</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                /{product.path}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="price">Ціна</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {product.price}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="colors">Кольори</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 flex flex-wrap gap-[10px]">
                                {product.productColors.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex gap-[5px] items-center"
                                    >
                                        <div className="">
                                            {item.color.name}
                                        </div>
                                        <div
                                            className="border border-gray-300 rounded w-[15px] h-[15px]"
                                            style={{
                                                backgroundColor:
                                                    item.color.hexCode,
                                            }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="sizes">Розміри</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 flex flex-wrap gap-[10px]">
                                {product.productSizes.map((item, i) => (
                                    <div
                                        className="flex gap-[5px] items-center"
                                        key={i}
                                    >
                                        <div className="">{item.size.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="types">Типи</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 flex flex-wrap gap-[10px]">
                                {product.productTypes.map((item, i) => (
                                    <div
                                        className="flex gap-[5px] items-center"
                                        key={i}
                                    >
                                        <div className="">{item.type.name}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[20px] w-1/3">
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="description">Опис</label>
                            <div className="border break-all border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 max-h-[130px] overflow-y-auto">
                                {product.description}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="composition">Склад</label>
                            <div className="border break-all border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 max-h-[130px] overflow-y-auto">
                                {product.composition}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="status">Доступність</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {product.available ? "Доступно" : "Не доступно"}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="status">Статус</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {product.status}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="views">Перегляди</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {product.views}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[20px] w-1/3">
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="views">Cтворено</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {formatDate(product.createdAt)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="views">Редаговано</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {formatDate(product.updatedAt)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="views">
                                Входить до колекції та категорії
                            </label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {`${collectionPath}/${categoryPath}`}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[7px] w-full">
                            <label htmlFor="bannerUrl">Банер</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                <img
                                    className="max-h-[300px] object-contain "
                                    src={
                                        `http://localhost:5000/${product.banner}` ||
                                        "/placeholder.png"
                                    }
                                    alt={product.name || "Банер"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-[20px]">
                    <div className="flex flex-col gap-[7px]">
                        <label htmlFor="views">Додаткові зображення</label>
                        <div className="flex gap-[10px]">
                            {product.images.map((image, i) => (
                                <Image
                                    key={i}
                                    src={`http://localhost:5000${image}`}
                                    alt="banner"
                                    width={250}
                                    height={2500}
                                    className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 object-cover"
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-[20px] py-[7px] bg-white text-black hover:bg-black hover:border-transparent hover:text-white cursor-pointer transition-all duration-200"
                    >
                        Закрити
                    </button>
                </div>
            </div>
        </div>
    );
    return createPortal(modalContent, document.body);
}
