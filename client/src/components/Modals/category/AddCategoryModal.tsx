"use client";

import { statuses } from "@/lib/helpers/helpers";
import { useUploadImage } from "@/lib/hooks/useImages";
import { ICollection, TStatus } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import { useCreateCategory } from "@/lib/hooks/useCategories";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionId: ICollection["id"];
    collectionPath: ICollection["path"];
}

export default function AddCategoryModal({
    isOpen,
    onClose,
    collectionId,
    collectionPath,
}: ModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [banner, setBanner] = useState<File | null>(null);
    const [status, setStatus] = useState<TStatus | null>(null);

    const [preview, setPreview] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");

    const uploadImageMutation = useUploadImage();
    const createCategoryMutation = useCreateCategory();

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

            await createCategoryMutation.mutateAsync({
                collectionPath,
                categoryData: {
                    name,
                    path,
                    banner: imagePath,
                    views: 0,
                    status,
                    collectionId,
                    id: "",
                    products: [],
                    createdAt: "",
                    updatedAt: "",
                },
            });

            setMessage("Категорію успішно додано!");
            handleClose();
        } catch (error) {
            setMessage("Помилка при створенні категорії");
            console.error(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
            <div className="bg-white p-[40px] shadow-lg max-w-3xl w-full">
                <h2 className="text-lg font-bold mb-4">Додавання категорії</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-[20px] justify-between">
                        <div className="flex flex-col gap-[20px] w-1/2">
                            <div className="flex flex-col gap-[7px]">
                                <label htmlFor="name">Назва</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                                    placeholder="Назва категорії"
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
                                createCategoryMutation.isPending
                            }
                        >
                            Відмінити
                        </button>
                        <button
                            type="submit"
                            className="px-[20px] py-[7px] bg-black/70 border hover:bg-black hover:border-transparent text-white cursor-pointer transition-all duration-200"
                            disabled={
                                uploadImageMutation.isPending ||
                                createCategoryMutation.isPending
                            }
                        >
                            {uploadImageMutation.isPending ||
                            createCategoryMutation.isPending
                                ? "Завантаження..."
                                : "Додати"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
