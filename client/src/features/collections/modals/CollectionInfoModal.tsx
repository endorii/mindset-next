"use client";

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
import { ICollection } from "../types/collections.types";
import { formatDate } from "@/shared/utils/formatDate";

export interface CollectionInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    collection: ICollection;
}

export default function CollectionInfoModal({
    isOpen,
    onClose,
    collection,
}: CollectionInfoModalProps) {
    if (!isOpen || !collection) return null;

    const {
        name,
        path,
        status,
        description,
        views,
        createdAt,
        updatedAt,
        categories,
        banner,
    } = collection;

    useEscapeKeyClose({ isOpen, onClose });

    const modalContent = (
        <ModalWrapper
            onClose={onClose}
            modalTitle={`Інформація про колекцію ${name}`}
        >
            <FormFillingWrapper>
                <div className="grid grid-cols-3 gap-[15px]">
                    <InfoField label={"Назва"} value={name} />
                    <InfoField label={"Шлях"} value={path} />
                    <InfoField label={"Статус"} value={status} />
                </div>
                <TextareaInfoField label={"Опис"} value={description} />
                <div className="grid grid-cols-3 gap-[15px]">
                    <InfoField label={"Переглядів"} value={views} />
                    <InfoField
                        label="Створено"
                        value={formatDate(createdAt || "")}
                    />
                    <InfoField
                        label="Редаговано"
                        value={formatDate(updatedAt || "")}
                    />
                    <InfoField
                        label={"Кількість категорій"}
                        value={categories?.length}
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
