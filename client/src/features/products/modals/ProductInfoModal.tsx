"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import {
    AtributesInfoField,
    InfoField,
    InfoModalBanner,
    Label,
    TextareaInfoField,
} from "@/shared/ui/components";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { formatDate } from "@/shared/utils/formatDate";
import Image from "next/image";
import { createPortal } from "react-dom";
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
        isAvailable,
        isVisible,
        description,
        composition,
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
                    <InfoField
                        label="Availability"
                        value={
                            isAvailable === false
                                ? "Not available"
                                : "Available"
                        }
                    />
                    <InfoField
                        label="Status"
                        value={isVisible === false ? "Not visible" : "Visible"}
                    />
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

                <div className="flex flex-col gap-[3px]">
                    <Label>Additional images</Label>
                    <div className="flex flex-wrap gap-[15px] mt-4 max-w-[700px]">
                        {images.length > 0 ? (
                            images.map((image, i) => (
                                <Image
                                    key={i}
                                    src={image}
                                    alt={`Images ${i + 1}`}
                                    width={150}
                                    height={150}
                                    className="w-[150px] object-contain"
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
                <MonoButtonUnderlined onClick={onClose}>
                    Close
                </MonoButtonUnderlined>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
