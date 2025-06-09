"use client";

import { formatDate } from "@/lib/helpers/formatDate";
import { ICollection } from "@/types/types";

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

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
            <div className="bg-white p-[40px] shadow-lg max-w-4xl w-full">
                <h2 className="text-lg font-bold mb-4">
                    Інформація про колекцію: {collection.name || "Без назви"}
                </h2>
                <div className="flex gap-[20px] justify-between">
                    <div className="flex flex-col gap-[20px] w-[50%]">
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="name">Назва:</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {collection.name}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="path">Шлях</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                /{collection.path}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="status">Статус</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {collection.status}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="views">Перегляди</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {collection.views}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="views">Cтворено</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {formatDate(collection.createdAt)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="views">Редаговано</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {formatDate(collection.updatedAt)}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[20px] w-1/2">
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="views">Кількість категорій</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                {collection.categories.length}
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px] w-full">
                            <label htmlFor="bannerUrl">Банер</label>
                            <div className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50">
                                <img
                                    className="max-h-[300px] object-contain "
                                    src={
                                        `http://localhost:5000/${collection.banner}` ||
                                        "/placeholder.png"
                                    }
                                    alt={collection.name || "Банер"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-[20px] py-[7px] bg-white text-black hover:bg-black hover:border-transparent hover:text-white cursor-pointer transition-all duration-200"
                    >
                        Закрити
                    </button>
                </div>
            </div>
        </div>
    );
}
