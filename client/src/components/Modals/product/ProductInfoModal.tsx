"use client";

import { formatDate } from "@/lib/helpers/formatDate";
import { IProductModalProps } from "@/types/types";
import Image from "next/image";

export default function ProductInfoModal({
    isOpen,
    onClose,
    collectionPath,
    categoryPath,
    item,
}: IProductModalProps) {
    if (!isOpen || !item) return null;

    console.log(item);

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
            <div className="bg-white p-[40px] h-[90vh] shadow-lg max-w-4xl w-full overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">
                    Інформація про товар: {item.name || "Без назви"}
                </h2>
                <div className="flex gap-[20px] justify-between">
                    <div className="flex flex-col gap-[20px] w-1/3">
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="name">Назва:</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {item.name}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="path">Шлях</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                /{item.path}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="price">Ціна</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {item.price}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="status">Доступність</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {item.available ? "Доступно" : "Не доступно"}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="status">Статус</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {item.status}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="views">Перегляди</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {item.views}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-[20px] w-1/3">
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="description">Опис</label>
                            <div className="border break-all border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 max-h-[130px] overflow-y-auto">
                                {item.description}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="composition">Склад</label>
                            <div className="border break-all border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 max-h-[130px] overflow-y-auto">
                                {item.composition}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="status">Доступні кольори</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {item.status}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="status">Доступні розміри</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {item.status}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[20px] w-1/3">
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="views">Cтворено</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {formatDate(item.createdAt)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="views">Редаговано</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {formatDate(item.updatedAt)}
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
                                        `http://localhost:5000/${item.banner}` ||
                                        "/placeholder.png"
                                    }
                                    alt={item.name || "Банер"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="flex flex-col gap-[7px]">
                        <label htmlFor="views">Додаткові зображення</label>
                        <div className="flex gap-[10px]">
                            {item.images.map((image, i) => (
                                <Image
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
}
