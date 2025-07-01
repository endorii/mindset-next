"use client";

import { formatDate } from "@/lib/helpers/formatDate";
import { ICollection } from "@/types/collection/collection.types";
import { createPortal } from "react-dom";
import InfoField from "@/components/AdminPage/components/InfoField";
import Image from "next/image";
import { useEscapeKeyClose } from "@/lib/hooks/useEscapeKeyClose";

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
        <div
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div className="bg-black">
                <div
                    className="rounded-xl text-white bg-gradient-to-br from-black/0 to-white/3 border border-white/10 p-[30px] h-auto max-h-[80vh] shadow-lg w-[54vw] overflow-y-auto cursor-default"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-3xl font-thin mb-4">
                        Інформація про колекцію
                    </h2>
                    <hr className="border-t border-white/10 py-[10px]" />
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
                                label={"Кількість категорій"}
                                value={categories.length}
                            />
                        </div>
                        <div className="flex flex-col gap-[7px] w-full">
                            <label className="text-sm font-semibold">
                                Банер:
                            </label>
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
                        <button
                            onClick={onClose}
                            className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black"
                        >
                            Закрити
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
