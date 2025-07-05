"use client";

import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import InfoField from "@/shared/ui/inputs/InfoField";
import { formatDate } from "@/shared/utils/formatDate";
import { createPortal } from "react-dom";
import { ICollection } from "../types/collections.types";
import Image from "next/image";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";

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
            <div className="flex flex-col gap-[20px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                    <InfoField label={"Назва"} value={name} />
                    <InfoField label={"Шлях"} value={path} />
                    <InfoField label={"Статус"} value={status} />
                    <InfoField label={"Переглядів"} value={views} />
                    <InfoField label="Створено" value={formatDate(createdAt)} />
                    <InfoField
                        label="Редаговано"
                        value={formatDate(updatedAt)}
                    />
                    <InfoField
                        label={"Кількість категорій"}
                        value={categories.length}
                    />
                </div>
                <div className="flex flex-col gap-[7px] w-full">
                    <label className="text-sm font-semibold">Банер:</label>
                    <div className="min-h-[100px] max-w-[300px] border border-dashed border-white/10 mt-2 flex items-center justify-center rounded-md overflow-hidden">
                        <Image
                            className="object-cover rounded"
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
            </div>

            <div className="flex justify-end mt-6">
                <MonoButton onClick={onClose}>Закрити</MonoButton>
            </div>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
