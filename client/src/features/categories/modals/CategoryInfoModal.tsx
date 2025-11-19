"use client";

import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { InfoModalBanner, TextareaInfoField } from "@/shared/ui/components";
import { InfoField } from "@/shared/ui/inputs/InfoField";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { formatDate } from "@/shared/utils/formatDate";
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
        status,
        views,
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
                    <InfoField label="Status" value={status} />
                </div>
                <TextareaInfoField label={"Description"} value={description} />
                <div className="grid grid-cols-3 gap-[15px]">
                    <InfoField label="Views" value={views} />
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
                    <InfoField
                        label="Included in the collection"
                        value={category.collection?.path}
                    />
                </div>
                <InfoModalBanner image={banner} />
            </FormFillingWrapper>
            <FormButtonsWrapper>
                <MonoButton onClick={onClose}>Close</MonoButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
