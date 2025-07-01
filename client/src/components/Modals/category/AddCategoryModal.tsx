"use client";

import { statuses } from "@/lib/helpers/helpers";
import { useUploadImage } from "@/lib/hooks/useImages";
import { TStatus } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import { useCreateCategory } from "@/lib/hooks/useCategories";
import { createPortal } from "react-dom";
import { ICollection } from "@/types/collection/collection.types";
import InputField from "@/components/AdminPage/components/InputField";
import { useEscapeKeyClose } from "@/lib/hooks/useEscapeKeyClose";

interface AddCategoryModalProps {
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
}: AddCategoryModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [banner, setBanner] = useState<File | null>(null);
    const [status, setStatus] = useState<TStatus>("INACTIVE");

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
        setStatus("INACTIVE");
        setPreview(null);
        setMessage("");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !path.trim() || !status) {
            setMessage("Заповніть усі обов'язкові поля!");
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
                    name: name.trim(),
                    path: path.trim(),
                    banner: imagePath,
                    views: 0,
                    status,
                    collectionId,
                },
            });

            setMessage("Категорію успішно додано!");
            handleClose();
        } catch (error) {
            setMessage("Помилка при створенні категорії");
            console.error(error);
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-black rounded-xl text-white bg-gradient-to-br from-black/0 to-white/5 border border-white/10 p-[30px] max-h-[80vh] shadow-lg w-[54vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-3xl font-thin mb-6">Додавання категорії</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[20px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                            <InputField
                                label="Назва"
                                value={name}
                                onChangeValue={(e) => setName(e.target.value)}
                                id="addCategoryName"
                                name="addCategoryName"
                                placeholder="Назва категорії"
                                type="text"
                            />
                            <InputField
                                label="Шлях"
                                value={path}
                                onChangeValue={(e) => setPath(e.target.value)}
                                id="addCategoryPath"
                                name="addCategoryPath"
                                placeholder="Шлях"
                                type="text"
                            />
                            <div className="flex flex-col gap-[7px]">
                                <label
                                    className="font-semibold text-sm"
                                    htmlFor="status"
                                >
                                    Статус
                                </label>
                                <select
                                    name="status"
                                    className="border border-white/10 rounded p-[10px] outline-0 cursor-pointer"
                                    value={status ?? ""}
                                    onChange={(e) =>
                                        setStatus(e.target.value as TStatus)
                                    }
                                >
                                    <option
                                        className="text-white bg-black"
                                        value=""
                                        disabled
                                    >
                                        Оберіть статус
                                    </option>
                                    {statuses.map((statusOption) => (
                                        <option
                                            className="text-white bg-black"
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
                            <label
                                htmlFor="banner"
                                className="text-sm font-semibold cursor-pointer"
                            >
                                Банер
                            </label>
                            <label
                                htmlFor="banner"
                                className="min-h-[100px] max-w-[300px] border border-dashed border-white/20 mt-2 flex items-center justify-center cursor-pointer bg-black/10 hover:bg-black/20 rounded-xl overflow-hidden"
                            >
                                {preview ? (
                                    <Image
                                        src={preview}
                                        alt="banner"
                                        width={250}
                                        height={250}
                                        className="object-cover"
                                    />
                                ) : (
                                    <span className="text-5xl text-white">
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
                    {message && <p className="mt-4 text-red-500">{message}</p>}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={
                                uploadImageMutation.isPending ||
                                createCategoryMutation.isPending
                            }
                            className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Скасувати
                        </button>
                        <button
                            type="submit"
                            disabled={
                                uploadImageMutation.isPending ||
                                createCategoryMutation.isPending
                            }
                            className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
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

    return createPortal(modalContent, document.body);
}
