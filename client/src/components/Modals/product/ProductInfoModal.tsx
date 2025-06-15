"use client";

import InfoField from "@/components/AdminPage/components/InfoField";
import { formatDate } from "@/lib/helpers/formatDate";
import { ICategory } from "@/types/category/category.types";
import { ICollection } from "@/types/collection/collection.types";
import { IProduct } from "@/types/product/product.types";
import Image from "next/image";
import { useEffect } from "react";
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
    const {
        name,
        path,
        price,
        available,
        status,
        description,
        composition,
        views,
        createdAt,
        updatedAt,
        productColors,
        productSizes,
        productTypes,
        banner,
        images,
    } = product;

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !product) return null;

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/70 flex items-center products-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-white p-[30px] h-auto max-h-[80vh] shadow-lg w-[54vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold mb-4">
                    Інформація про товар: {product.name || "Без назви"}
                </h2>
                <div className="flex flex-col gap-[20px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InfoField label={"Назва"} value={name} />
                        <InfoField label={"Шлях"} value={path} />
                        <InfoField label={"Ціна"} value={price} />
                        <InfoField
                            label={"Доступність"}
                            value={available ? "Доступно" : "Не доступно"}
                        />
                        <InfoField label={"Статус"} value={status} />
                        <InfoField label={"Перегляди"} value={views} />
                        <InfoField
                            label={"Cтворено"}
                            value={formatDate(createdAt)}
                        />
                        <InfoField
                            label={"Редаговано"}
                            value={formatDate(updatedAt)}
                        />
                        <InfoField
                            label={"Входить до колекції та категорії"}
                            value={`${collectionPath}/${categoryPath}`}
                        />
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="description">Опис</label>
                            <div className="border break-all border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 max-h-[130px] overflow-y-auto">
                                {description}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="composition">Склад</label>
                            <div className="border break-all border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 max-h-[130px] overflow-y-auto">
                                {composition}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="colors">Кольори</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 flex flex-wrap gap-[10px]">
                                {productColors.length > 0
                                    ? productColors.map((item, i) => (
                                          <div
                                              key={i}
                                              className="flex gap-[5px] items-center px-3 py-1 rounded-full text-sm border border-gray-300 bg-black text-white"
                                          >
                                              <div>{item.color.name}</div>
                                              <div
                                                  className="border border-gray-300 rounded-full w-[15px] h-[15px]"
                                                  style={{
                                                      backgroundColor:
                                                          item.color.hexCode,
                                                  }}
                                              ></div>
                                          </div>
                                      ))
                                    : "Не вказано"}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="sizes">Розміри</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 flex flex-wrap gap-[10px]">
                                {productSizes.length > 0
                                    ? productSizes.map((item, i) => (
                                          <div
                                              className="flex gap-[5px] items-center px-3 py-1 rounded-full text-sm border border-gray-300 bg-black text-white"
                                              key={i}
                                          >
                                              <div>{item.size.name}</div>
                                          </div>
                                      ))
                                    : "Не вказано"}
                            </div>
                        </div>

                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="types">Типи</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 flex flex-wrap gap-[10px]">
                                {productTypes.length > 0
                                    ? productTypes.map((item, i) => (
                                          <div
                                              className="flex gap-[5px] items-center px-3 py-1 rounded-full text-sm border border-gray-300 bg-black text-white"
                                              key={i}
                                          >
                                              <div>{item.type.name}</div>
                                          </div>
                                      ))
                                    : "Не вказано"}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <div className="flex flex-col gap-[7px] w-full">
                            <label htmlFor="bannerUrl">Банер</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                <img
                                    className="max-h-[300px] object-contain "
                                    src={
                                        `http://localhost:5000/${banner}` ||
                                        "/placeholder.png"
                                    }
                                    alt={name || "Банер"}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px] w-full">
                            <label htmlFor="views">Додаткові зображення</label>
                            <div className="flex gap-[10px]">
                                {images.map((image, i) => (
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
                </div>

                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                    >
                        Закрити
                    </button>
                </div>
            </div>
        </div>
    );
    return createPortal(modalContent, document.body);
}
