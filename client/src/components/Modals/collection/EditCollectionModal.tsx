"use client";

import { deleteImage } from "@/lib/api/images.api";
import { statuses } from "@/lib/helpers/helpers";
import { useEditCollection } from "@/lib/hooks/useCollections";
import { useUploadImage } from "@/lib/hooks/useImages";
import { ICollection } from "@/types/collection/collection.types";
import { TStatus } from "@/types/types";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import { createPortal } from "react-dom";

interface EditCollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    collection: ICollection;
}

export default function EditCollectionModal({
    isOpen,
    onClose,
    collection,
}: EditCollectionModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [status, setStatus] = useState<TStatus | "">("");
    const [banner, setBanner] = useState<string | File>("");

    const [preview, setPreview] = useState("");

    const uploadImageMutation = useUploadImage();
    const editCollection = useEditCollection();

    useEffect(() => {
        if (collection) {
            setName(collection.name || "");
            setPath(collection.path || "");
            setBanner(collection.banner || "");
            setStatus(collection.status || "");
        }
    }, [collection]);

    const handleConfirm = async () => {
        if (!status) {
            alert("Будь ласка, оберіть статус колекції");
            return;
        }

        try {
            let bannerPath = typeof banner === "string" ? banner : "";

            if (banner instanceof File) {
                if (
                    typeof collection.banner === "string" &&
                    collection.banner.startsWith("/images/")
                ) {
                    await deleteImage(collection.banner);
                }

                const uploadImage = await uploadImageMutation.mutateAsync(
                    banner
                );

                bannerPath = uploadImage.path;
            }

            await editCollection.mutateAsync({
                collectionPath: collection.path,
                data: {
                    name,
                    path,
                    status,
                    banner: bannerPath,
                },
            });

            onClose();
            console.log("Відправлено на редагування");
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

    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        if (statuses.includes(val as TStatus)) {
            setStatus(val as TStatus);
        } else {
            setStatus("");
        }
    };

    if (!isOpen || !collection) return null;

    const bannerSrc =
        typeof banner === "string" && banner.startsWith("/images/")
            ? `http://localhost:5000${banner}`
            : "";

    const modalContent = (
        <div className="fixed inset-0 bg-black/70 flex items-center products-center justify-center z-100">
            <div className="bg-white p-[40px] h-[65vh] shadow-lg w-[40vw] overflow-y-auto">
                <div className="flex flex-col gap-[20px]">
                    <h2 className="text-lg font-bold mb-4">
                        Редагування колекції: {collection.name || "Без назви"}
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
                                onChange={handleStatusChange}
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
                    <div className="flex gap-[20px]">
                        <div>
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
                                        height={300}
                                        className="object-cover"
                                    />
                                ) : bannerSrc ? (
                                    <Image
                                        src={bannerSrc}
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
                        </div>
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

    return createPortal(modalContent, document.body);
}
