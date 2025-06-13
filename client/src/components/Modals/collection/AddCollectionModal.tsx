"use client";

import { useState } from "react";
import { useCreateCollection } from "@/lib/hooks/useCollections";
import { TStatus } from "@/types/types";
import { statuses } from "@/lib/helpers/helpers";
import { useUploadImage } from "@/lib/hooks/useImages";
import Image from "next/image";
import { createPortal } from "react-dom";

interface AddCollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddCollectionModal({
    isOpen,
    onClose,
}: AddCollectionModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [banner, setBanner] = useState<File | null>(null);
    const [status, setStatus] = useState<TStatus | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");

    const uploadImageMutation = useUploadImage();
    const createCollectionMutation = useCreateCollection();

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setBanner(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleClose = () => {
        if (preview) URL.revokeObjectURL(preview);
        setName("");
        setPath("");
        setBanner(null);
        setStatus(null);
        setPreview(null);
        setMessage("");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !path || !status) {
            setMessage("Заповніть усі поля!");
            return;
        }
        if (!banner) {
            setMessage("Виберіть зображення для банера!");
            return;
        }
        try {
            const uploadResult = await uploadImageMutation.mutateAsync(banner);
            const imagePath = uploadResult.path;
            await createCollectionMutation.mutateAsync({
                name,
                path,
                banner: imagePath,
                views: 0,
                status,
            });
            setMessage("Колекцію успішно додано!");
            handleClose();
        } catch (error) {
            setMessage("Помилка при створенні колекції");
            console.error(error);
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
            <div className="bg-white p-[40px] shadow-lg max-w-3xl w-full">
                <h2 className="text-lg font-bold mb-4">Додавання колекції</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-[20px] justify-between">
                        <div className="flex flex-col gap-[20px] w-[50%]">
                            <div className="flex flex-col gap-[7px]">
                                <label htmlFor="name">Назва</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                                    placeholder="Назва колекції"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-[7px]">
                                <label htmlFor="path">Шлях</label>
                                <input
                                    id="path"
                                    name="path"
                                    type="text"
                                    className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                                    placeholder="Шлях"
                                    value={path}
                                    onChange={(e) => setPath(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-[7px]">
                                <label htmlFor="status">Статус</label>
                                <select
                                    name="status"
                                    className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                                    value={status ?? ""}
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
                        <div className="flex flex-col gap-[20px] w-1/2">
                            <div>
                                <label
                                    htmlFor="banner"
                                    className="text-sm font-semibold"
                                >
                                    Банер
                                </label>
                                <label
                                    htmlFor="banner"
                                    className="min-h-[100px] max-w-[300px] border border-dashed border-gray-400 mt-2 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-md overflow-hidden"
                                >
                                    {preview ? (
                                        <Image
                                            src={preview}
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
                    {message && <p className="mt-4 text-red-500">{message}</p>}
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-[20px] py-[7px] bg-white text-black hover:bg-black hover:border-transparent hover:text-white cursor-pointer transition-all duration-200"
                            disabled={
                                uploadImageMutation.isPending ||
                                createCollectionMutation.isPending
                            }
                        >
                            Відмінити
                        </button>
                        <button
                            type="submit"
                            className="px-[20px] py-[7px] bg-black/70 border hover:bg-black hover:border-transparent text-white cursor-pointer transition-all duration-200"
                            disabled={
                                uploadImageMutation.isPending ||
                                createCollectionMutation.isPending
                            }
                        >
                            {uploadImageMutation.isPending ||
                            createCollectionMutation.isPending
                                ? "Завантаження..."
                                : "Додати"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
