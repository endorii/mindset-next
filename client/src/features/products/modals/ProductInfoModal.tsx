"use client";

import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import {
    TextareaInfoField,
    AtributesInfoField,
    InfoModalBanner,
} from "@/shared/ui/components";
import InfoField from "@/shared/ui/inputs/InfoField";
import {
    ModalWrapper,
    FormFillingWrapper,
    FormButtonsWrapper,
} from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { Label } from "recharts";
import { IProduct } from "../types/products.types";
import Image from "next/image";
import { formatDate } from "@/shared/utils/formatDate";

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
    product,
}: ProductInfoModalProps) {
    const {
        name,
        path,
        price,
        oldPrice,
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
                    <InfoField label="Стара ціна" value={oldPrice} />
                    <InfoField label="Доступність" value={available} />
                    <InfoField label="Статус" value={status} />
                    <InfoField label="Перегляди" value={views} />
                    <InfoField label="Створено" value={formatDate(createdAt)} />
                    <InfoField
                        label="Редаговано"
                        value={formatDate(updatedAt)}
                    />
                </div>
                <TextareaInfoField label={"Опис"} value={description} />
                <TextareaInfoField label={"Склад"} value={composition} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                    <AtributesInfoField
                        label={"Кольори"}
                        atributeList={productColors}
                    />
                    <AtributesInfoField
                        label={"Розміри"}
                        atributeList={productSizes}
                    />
                    <AtributesInfoField
                        label={"Типи"}
                        atributeList={productTypes}
                    />
                </div>

                <InfoModalBanner image={banner} />

                <div className="flex flex-col gap-[7px]">
                    <Label>Додаткові зображення</Label>
                    <div className="flex gap-[10px]">
                        {images.length > 0 ? (
                            images.map((image, i) => (
                                <Image
                                    key={i}
                                    src={`http://localhost:5000${image}`}
                                    alt={`Зображення ${i + 1}`}
                                    width={100}
                                    height={0}
                                    className="border border-white/20 rounded w-[200px]"
                                />
                            ))
                        ) : (
                            <div className="text-white opacity-50">
                                Немає зображень
                            </div>
                        )}
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
