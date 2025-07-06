"use client";

import { ICollection } from "@/features/collections/types/collections.types";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import InfoField from "@/shared/ui/inputs/InfoField";
import { formatDate } from "@/shared/utils/formatDate";
import Image from "next/image";
import { createPortal } from "react-dom";
import { ICategory } from "../types/categories.types";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";

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
                    <InfoField label="Шлях" value={path} />
                    <InfoField label="Статус" value={status} />
                    <InfoField label="Переглядів" value={views} />
                    <InfoField label="Створено" value={formatDate(createdAt)} />
                    <InfoField
                        label="Редаговано"
                        value={formatDate(updatedAt)}
                    />
                    <InfoField
                        label="Кількість товарів"
                        value={products.length}
                    />
                    <InfoField
                        label="Входить до колекції"
                        value={collectionPath}
                    />
                </div>

                <div className="flex flex-col gap-[7px] w-full">
                    <label className="text-sm font-semibold">Банер:</label>
                    <div className="rounded">
                        <Image
                            className="max-h-[300px] object-contain rounded border border-white/10 px-[10px] py-[7px] bg-black/10"
                            src={
                                banner
                                    ? `http://localhost:5000/${banner}`
                                    : "/placeholder.png"
                            }
                            alt={name || "Банер"}
                            width={250}
                            height={250}
                        />
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
