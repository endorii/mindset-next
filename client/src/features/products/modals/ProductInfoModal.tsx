"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import {
    AtributesInfoField,
    InfoModalBanner,
    TextareaInfoField,
} from "@/shared/ui/components";
import { InfoField } from "@/shared/ui/inputs/InfoField";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { formatDate } from "@/shared/utils/formatDate";
import Image from "next/image";
import { createPortal } from "react-dom";
import { Label } from "recharts";
import { IProduct } from "../types/products.types";

export interface ProductInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: IProduct;
}

export function ProductInfoModal({
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
        <ModalWrapper onClose={onClose} modalTitle={"Product information"}>
            <FormFillingWrapper>
                <div className="grid grid-cols-3 gap-[15px]">
                    <InfoField label="Name" value={name} />
                    <InfoField label="Path" value={path} />
                    <InfoField label="Price" value={price} />
                    <InfoField label="Old price" value={oldPrice} />
                    <InfoField label="Accessibility" value={available} />
                    <InfoField label="Status" value={status} />
                    <InfoField label="Views" value={views} />
                    <InfoField label="Created" value={formatDate(createdAt)} />
                    <InfoField label="Edited" value={formatDate(updatedAt)} />
                </div>
                <TextareaInfoField label={"Description"} value={description} />
                <TextareaInfoField label={"Composition"} value={composition} />
                <div className="grid grid-cols-3 gap-[15px]">
                    <AtributesInfoField
                        label={"Colors"}
                        atributeList={productColors}
                    />
                    <AtributesInfoField
                        label={"Sizes"}
                        atributeList={productSizes}
                    />
                    <AtributesInfoField
                        label={"Types"}
                        atributeList={productTypes}
                    />
                </div>

                <InfoModalBanner image={banner} />

                <div className="flex flex-col gap-[7px]">
                    <Label>Additional images</Label>
                    <div className="flex gap-[10px]">
                        {images.length > 0 ? (
                            images.map((image, i) => (
                                <Image
                                    key={i}
                                    src={image}
                                    alt={`Images ${i + 1}`}
                                    width={100}
                                    height={100}
                                    className="border border-white/20 w-[200px]"
                                />
                            ))
                        ) : (
                            <div className="text-white opacity-50">
                                No images
                            </div>
                        )}
                    </div>
                </div>
            </FormFillingWrapper>
            <FormButtonsWrapper>
                <MonoButton onClick={onClose}>Close</MonoButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
