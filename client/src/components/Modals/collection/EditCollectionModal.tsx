"use client";

import { statuses } from "@/lib/helpers/helpers";
import { useEditCollection } from "@/lib/hooks/useCollections";
import { useUploadImage } from "@/lib/hooks/useImages";
import { ICollection, TStatus } from "@/types/types";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";

interface EditCollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: ICollection;
}

export default function EditCollectionModal({
    isOpen,
    onClose,
    item,
}: EditCollectionModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [status, setStatus] = useState<TStatus>();
    const [banner, setBanner] = useState<string | File>("");

    const [preview, setPreview] = useState("");

    const uploadImageMutation = useUploadImage();
    const editCollection = useEditCollection();

    useEffect(() => {
        if (item) {
            setName(item.name || "");
            setPath(item.path || "");
            setBanner(item.banner || "");
            setStatus(item.status || "");
        }
    }, [item]);

    const handleConfirm = async () => {
        try {
            let bannerPath = typeof banner === "string" ? banner : "";

            if (banner instanceof File) {
                const uploadResult = await uploadImageMutation.mutateAsync(
                    banner
                );
                bannerPath = uploadResult.path;
            }

            await editCollection.mutateAsync({
                collectionPath: item.path,
                data: {
                    name,
                    path,
                    status: status || "",
                    banner: banner instanceof File ? banner : bannerPath,
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

    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
            <div className="flex flex-col  gap-[30px] bg-white p-[40px] shadow-lg max-w-3xl w-full">
                <div className="flex flex-col gap-[20px]">
                    <h2 className="text-lg font-bold mb-4">
                        Редагування колекції: {item.name || "Без назви"}
                    </h2>
                    <div className="flex flex-wrap gap-[20px]">
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="name">Назва</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                onChange={(e) => setPath(e.target.value)}
                                className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                                placeholder="Шлях (URL)"
                            />
                        </div>
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
                </div>
                <div className="flex flex-col gap-[20px]">
                    <div className="flex gap-[20px]">
                        <div>
                            <label htmlFor="banner">Банер</label>
                            <label
                                htmlFor="banner"
                                className="min-h-[100px] max-w-[300px] border border-dashed border-gray-400 mt-2 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-md overflow-hidden"
                            >
                                {preview ? (
                                    <Image
                                        src={preview}
                                        alt="preview"
                                        width={250}
                                        height={300}
                                        className="object-cover"
                                    />
                                ) : banner ? (
                                    <Image
                                        src={`http://localhost:5000${banner}`}
                                        alt="banner"
                                        width={250}
                                        height={300}
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
                        </div>{" "}
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
        </div>
    );
}
