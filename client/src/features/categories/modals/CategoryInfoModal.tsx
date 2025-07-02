"use client";

import { ICollection } from "@/features/collections/types/collections.types";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import InfoField from "@/shared/ui/inputs/InfoField";
import { formatDate } from "@/shared/utils/formatDate";
import Image from "next/image";
import { createPortal } from "react-dom";
import { ICategory } from "../types/categories.types";

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
        <div
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-black rounded-xl text-white bg-gradient-to-br from-black/0 to-white/5 border border-white/10 p-[30px] max-h-[80vh] shadow-lg w-[54vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-3xl font-thin mb-6">
                    Інформація про категорію: {name || "Без назви"}
                </h2>
                <hr className="border-t border-white/10 py-[10px]" />
                <div className="flex flex-col gap-[20px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InfoField label="Назва" value={name} />
                        <InfoField label="Шлях" value={path} />
                        <InfoField label="Статус" value={status} />
                        <InfoField label="Переглядів" value={views} />
                        <InfoField
                            label="Створено"
                            value={formatDate(createdAt)}
                        />
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
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black"
                    >
                        Закрити
                    </button>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
