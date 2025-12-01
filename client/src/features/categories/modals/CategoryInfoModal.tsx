"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButtonUnderlined } from "@/shared/ui/buttons";
import {
    InfoField,
    InfoModalBanner,
    TextareaInfoField,
} from "@/shared/ui/components";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { formatDate } from "@/shared/utils";
import { createPortal } from "react-dom";
import { ICategory } from "../types/categories.types";

interface CategoryInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: ICategory;
}

export function CategoryInfoModal({
    isOpen,
    onClose,
    category,
}: CategoryInfoModalProps) {
    if (!isOpen || !category) return null;

    const {
        name,
        path,
        description,
        isVisible,
        createdAt,
        updatedAt,
        banner,
        products,
    } = category;

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Category information"}>
            <FormFillingWrapper>
                <div className="grid grid-cols-3 gap-[15px]">
                    <InfoField label="Name" value={name} />
                    <InfoField label="Path" value={path} />{" "}
                    <InfoField
                        label="Visibility"
                        value={isVisible === false ? "Not visible" : "Visible"}
                    />
                </div>
                <TextareaInfoField label={"Description"} value={description} />
                <div className="grid grid-cols-3 gap-[15px]">
                    <InfoField
                        label="Created"
                        value={formatDate(createdAt || "")}
                    />
                    <InfoField
                        label="Edited"
                        value={formatDate(updatedAt || "")}
                    />
                    <InfoField
                        label="Number of products"
                        value={products?.length}
                    />
                </div>
                <InfoModalBanner image={banner || ""} />
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
