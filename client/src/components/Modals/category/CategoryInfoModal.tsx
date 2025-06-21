"use client";

import InfoField from "@/components/AdminPage/components/InfoField";
import { formatDate } from "@/lib/helpers/formatDate";
import { useEscapeKeyClose } from "@/lib/hooks/useEscapeKeyClose";
import { ICategory } from "@/types/category/category.types";
import { ICollection } from "@/types/collection/collection.types";
import Image from "next/image";
import { createPortal } from "react-dom";

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
            className="fixed inset-0 bg-black/70 flex items-center products-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-white p-[30px] h-auto max-h-[80vh] shadow-lg w-[54vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold mb-4">
                    Інформація про категорію: {category.name || "Без назви"}
                </h2>
                <div className="flex flex-col gap-[20px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InfoField label={"Назва"} value={name} />
                        <InfoField label={"Шлях"} value={path} />
                        <InfoField label={"Статус"} value={status} />
                        <InfoField label={"Переглядів"} value={views} />
                        <InfoField
                            label="Створено"
                            value={formatDate(createdAt)}
                        />
                        <InfoField
                            label="Редаговано"
                            value={formatDate(updatedAt)}
                        />
                        <InfoField
                            label={"Кількість товарів"}
                            value={products.length}
                        />

                        <InfoField
                            label={"Входить до колекції"}
                            value={collectionPath}
                        />
                    </div>

                    <div className="flex flex-col gap-[7px] w-full">
                        <label
                            htmlFor="bannerUrl"
                            className="text-sm font-semibold"
                        >
                            Банер:
                        </label>
                        <div className="rounded">
                            <Image
                                className="max-h-[300px] object-contain rounded border border-gray-200 px-[10px] py-[7px] bg-gray-50"
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
                <div className="flex justify-end mt-[20px]">
                    <button
                        onClick={onClose}
                        className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                    >
                        Закрити
                    </button>
                </div>
            </div>
        </div>
    );
    return createPortal(modalContent, document.body);
}
