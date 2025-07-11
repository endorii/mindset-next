"use client";

import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import InfoField from "@/shared/ui/inputs/InfoField";
import { formatDate } from "@/shared/utils/formatDate";
import Image from "next/image";
import { createPortal } from "react-dom";
import { IProduct } from "../types/products.types";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";

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

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !product) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Інформація про товар"}>
            <FormFillingWrapper>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                    <InfoField label="Назва" value={name} />
                    <InfoField label="Шлях" value={path} />
                    <InfoField label="Ціна" value={price} />
                    <InfoField
                        label="Доступність"
                        value={available ? "Доступно" : "Не доступно"}
                    />
                    <InfoField label="Статус" value={status} />
                    <InfoField label="Перегляди" value={views} />
                    <InfoField label="Створено" value={formatDate(createdAt)} />
                    <InfoField
                        label="Редаговано"
                        value={formatDate(updatedAt)}
                    />
                    <InfoField
                        label="Входить до колекції та категорії"
                        value={`${collectionPath || "-"} / ${
                            categoryPath || "-"
                        }`}
                    />

                    <div className="flex flex-col gap-[7px]">
                        <label>Опис</label>
                        <div className="border break-words border-white/20 rounded px-[10px] py-[7px] bg-black/10 max-h-[130px] overflow-y-auto">
                            {description || "Не вказано"}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[7px]">
                        <label>Склад</label>
                        <div className="border break-words border-white/20 rounded px-[10px] py-[7px] bg-black/10 max-h-[130px] overflow-y-auto">
                            {composition || "Не вказано"}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[7px]">
                        <label>Кольори</label>
                        <div className="border border-white/20 rounded px-[10px] py-[7px] bg-black/10 flex flex-wrap gap-[10px]">
                            {productColors.length > 0
                                ? productColors.map((item, i) => (
                                      <div
                                          key={i}
                                          className="flex gap-[5px] items-center px-3 py-1 rounded-full text-sm border border-white/30 bg-black text-white"
                                      >
                                          <div>{item.color.name}</div>
                                          <div
                                              className="border border-white/30 rounded-full w-[15px] h-[15px]"
                                              style={{
                                                  backgroundColor:
                                                      item.color.hexCode,
                                              }}
                                          />
                                      </div>
                                  ))
                                : "Не вказано"}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[7px]">
                        <label>Розміри</label>
                        <div className="border border-white/20 rounded px-[10px] py-[7px] bg-black/10 flex flex-wrap gap-[10px]">
                            {productSizes.length > 0
                                ? productSizes.map((item, i) => (
                                      <div
                                          className="flex gap-[5px] items-center px-3 py-1 rounded-full text-sm border border-white/30 bg-black text-white"
                                          key={i}
                                      >
                                          {item.size.name}
                                      </div>
                                  ))
                                : "Не вказано"}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[7px]">
                        <label>Типи</label>
                        <div className="border border-white/20 rounded px-[10px] py-[7px] bg-black/10 flex flex-wrap gap-[10px]">
                            {productTypes.length > 0
                                ? productTypes.map((item, i) => (
                                      <div
                                          className="flex gap-[5px] items-center px-3 py-1 rounded-full text-sm border border-white/30 bg-black text-white"
                                          key={i}
                                      >
                                          {item.type.name}
                                      </div>
                                  ))
                                : "Не вказано"}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                    <div className="flex flex-col gap-[7px] w-full">
                        <label>Банер</label>
                        <div className="border border-white/20 rounded px-[10px] py-[7px] bg-black/10 flex justify-center">
                            {banner ? (
                                <img
                                    src={`http://localhost:5000${banner}`}
                                    alt={name || "Банер"}
                                    className="max-h-[300px] object-contain"
                                />
                            ) : (
                                <div className="text-white opacity-50">
                                    Немає банера
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[7px] w-full">
                        <label>Додаткові зображення</label>
                        <div className="flex gap-[10px] overflow-x-auto">
                            {images.length > 0 ? (
                                images.map((image, i) => (
                                    <Image
                                        key={i}
                                        src={`http://localhost:5000${image}`}
                                        alt={`Зображення ${i + 1}`}
                                        width={250}
                                        height={250}
                                        className="border border-white/20 rounded object-cover"
                                    />
                                ))
                            ) : (
                                <div className="text-white opacity-50">
                                    Немає зображень
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </FormFillingWrapper>
            <FormButtonsWrapper>
                <MonoButton onClick={onClose}>Закрити</MonoButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
