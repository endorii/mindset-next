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
        <ModalWrapper onClose={onClose} modalTitle={"Інформація про категорію"}>
            <FormFillingWrapper>
                <div className="grid grid-cols-3 gap-[15px]">
                    <InfoField label="Назва" value={name} />
                    <InfoField label="Шлях" value={path} />{" "}
                    <InfoField label="Статус" value={status} />
                </div>
                <TextareaInfoField label={"Опис"} value={description} />
                <div className="grid grid-cols-3 gap-[15px]">
                    <InfoField label="Переглядів" value={views} />
                    <InfoField
                        label="Створено"
                        value={formatDate(createdAt || "")}
                    />
                    <InfoField
                        label="Редаговано"
                        value={formatDate(updatedAt || "")}
                    />
                    <InfoField
                        label="Кількість товарів"
                        value={products?.length}
                    />
                    <InfoField
                        label="Входить до колекції"
                        value={category.collection?.path}
                    />
                </div>
                <InfoModalBanner image={banner} />
            </FormFillingWrapper>
            <FormButtonsWrapper>
                <MonoButton onClick={onClose}>Закрити</MonoButton>
            </FormButtonsWrapper>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
