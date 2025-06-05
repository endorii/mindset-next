"use client";

import { IProduct, IProductModalProps } from "@/types/types";
import { useState, useEffect } from "react";

export default function EditProductModal({
    isOpen,
    onClose,
    item,
}: IProductModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [bannerUrl, setBannerUrl] = useState("");
    const [previewUrl, setPreviewUrl] = useState("");

    useEffect(() => {
        if (item) {
            setName(item.name || "");
            setPath(item.path || "");
            // setBannerUrl(item.banner || "");
            // setPreviewUrl(item.banner || "");
        }
    }, [item]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        if (name === "name") {
            setName(value);
        } else if (name === "path") {
            setPath(value);
        }
    };

    const handleConfirm = () => {
        const data: Partial<IProduct> = {
            name,
            path,
            // banner: bannerUrl,
        };
        onClose();
        console.log(data);
    };

    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
            <div className="bg-white p-[40px] shadow-lg max-w-3xl w-full">
                <h2 className="text-lg font-bold mb-4">
                    Редагування колекції: {item.name || "Без назви"}
                </h2>
                <div className="flex gap-[20px] justify-between">
                    <div className="flex flex-col gap-[20px] w-[50%]">
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="name">Назва</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={handleInputChange}
                                className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                                placeholder="Назва колекції"
                            />
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="path">Шлях</label>
                            <input
                                id="path"
                                name="path"
                                type="text"
                                value={path}
                                onChange={handleInputChange}
                                className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                                placeholder="Шлях (URL)"
                            />
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="banner">Банер</label>
                            <input
                                id="banner"
                                name="banner"
                                type="file"
                                onChange={handleInputChange}
                                className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                                accept="image/*"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[20px] w-[50%]">
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="bannerUrl">Банер (URL)</label>
                            <input
                                id="bannerUrl"
                                name="bannerUrl"
                                type="text"
                                value={bannerUrl}
                                disabled
                                className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0 disabled:opacity-35 disabled:cursor-not-allowed"
                            />
                        </div>
                        <img
                            className="h-[50vh] object-contain"
                            src={previewUrl || "/placeholder.png"}
                            alt={item.name || "Банер"}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <button
                        onClick={onClose}
                        className="px-[20px] py-[7px] bg-white text-black hover:bg-black hover:border-transparent hover:text-white cursor-pointer transition-all duration-200"
                    >
                        Скасувати
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="px-[20px] py-[7px] bg-black/70 border hover:bg-black hover:border-transparent text-white cursor-pointer transition-all duration-200"
                    >
                        Підтвердити
                    </button>
                </div>
            </div>
        </div>
    );
}
