"use client";

import InputField from "@/components/AdminPage/components/InputField";
import { statuses } from "@/lib/helpers/helpers";
import { useEditCategory } from "@/lib/hooks/useCategories";
import { useUploadImage } from "@/lib/hooks/useImages";
import { ICategory } from "@/types/category/category.types";
import { ICollection } from "@/types/collection/collection.types";
import { TStatus } from "@/types/types";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import { createPortal } from "react-dom";

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionPath: ICollection["path"];
    category: ICategory;
}

export default function EditCategoryModal({
    isOpen,
    onClose,
    collectionPath,
    category,
}: EditCategoryModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [status, setStatus] = useState<TStatus>("INACTIVE");
    const [banner, setBanner] = useState<string | File>("");

    const [preview, setPreview] = useState("");

    const uploadImageMutation = useUploadImage();
    const editCategoryMutation = useEditCategory();

    useEffect(() => {
        if (category) {
            setName(category.name || "");
            setPath(category.path || "");
            setBanner(category.banner || "");
            setStatus(category.status || "");
        }
    }, [category]);

    const handleSubmit = async () => {
        try {
            let bannerPath = typeof banner === "string" ? banner : "";

            if (banner instanceof File) {
                const uploadResult = await uploadImageMutation.mutateAsync(
                    banner
                );
                bannerPath = uploadResult.path;
            }

            await editCategoryMutation.mutateAsync({
                collectionPath,
                categoryPath: category.path,
                data: {
                    name,
                    path,
                    status,
                    banner: bannerPath,
                },
            });

            onClose();
        } catch (error) {
            console.error("Помилка при редагуванні колекції:", error);
        }
    };

    const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setBanner(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !category) return null;

    const bannerSrc =
        typeof banner === "string" && banner.startsWith("/images/")
            ? `http://localhost:5000${banner}`
            : "";

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
                    Редагування категорії: {category.name || "Без назви"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[20px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                            <InputField
                                label={"Назва"}
                                value={name}
                                onChangeValue={(e) => setName(e.target.value)}
                                id={"editCollectionName"}
                                name={"editCollectionName"}
                                placeholder={"Назва колекції"}
                                type={"text"}
                            />
                            <InputField
                                label={"Шлях"}
                                value={path}
                                onChangeValue={(e) => setName(e.target.value)}
                                id={"editCollectionPath"}
                                name={"editCollectionPath"}
                                placeholder={"Шлях"}
                                type={"text"}
                            />
                            <div className="flex flex-col gap-[7px]">
                                <label htmlFor="status">Статус</label>
                                <select
                                    name="status"
                                    className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                                    value={status}
                                    onChange={(e) =>
                                        setStatus(e.target.value as TStatus)
                                    }
                                >
                                    <option value="" disabled>
                                        Оберіть статус
                                    </option>
                                    {statuses.map((statusOption) => (
                                        <option
                                            key={statusOption}
                                            value={statusOption}
                                        >
                                            {statusOption}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-col gap-[7px] w-full">
                            <label htmlFor="banner">Банер</label>
                            <label
                                htmlFor="banner"
                                className="min-h-[100px] max-w-[300px] border border-dashed border-gray-400 mt-2 flex collections-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-md overflow-hidden"
                            >
                                {preview ? (
                                    <Image
                                        src={preview}
                                        alt="preview"
                                        width={250}
                                        height={250}
                                        className="object-cover"
                                    />
                                ) : bannerSrc ? (
                                    <Image
                                        src={bannerSrc}
                                        alt="banner"
                                        width={250}
                                        height={250}
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="text-4xl text-gray-400">
                                        +
                                    </span>
                                )}
                            </label>
                            <input
                                type="file"
                                id="banner"
                                accept="image/*"
                                onChange={handleBannerChange}
                                className="hidden"
                            />
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                onClick={onClose}
                                className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                            >
                                Скасувати
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                            >
                                Підтвердити
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
