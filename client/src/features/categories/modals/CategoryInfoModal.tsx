"use client";

import { ICollection } from "@/features/collections/types/collections.types";
import { useEscapeKeyClose } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { TextareaInfoField, InfoModalBanner } from "@/shared/ui/components";
import InfoField from "@/shared/ui/inputs/InfoField";
import {
    ModalWrapper,
    FormFillingWrapper,
    FormButtonsWrapper,
} from "@/shared/ui/wrappers";
import { createPortal } from "react-dom";
import { ICategory } from "../types/categories.types";
import { formatDate } from "@/shared/utils/formatDate";

interface CategoryInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionPath: ICollection["path"];
    category: ICategory;
}

export default function CategoryInfoModal({
    isOpen,
    onClose,
    collectionPath,
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                    <InfoField label="Назва" value={name} />
                    <InfoField label="Шлях" value={path} />{" "}
                    <InfoField label="Статус" value={status} />
                </div>
                <TextareaInfoField label={"Опис"} value={description} />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
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
                        value={collectionPath}
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
