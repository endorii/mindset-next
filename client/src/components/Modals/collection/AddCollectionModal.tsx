"use client";

import { useState } from "react";
import { useCreateCollection } from "@/lib/hooks/useCollections";
import { TStatus } from "@/types/types";
import { statuses } from "@/lib/helpers/helpers";
import { useUploadImage } from "@/lib/hooks/useImages";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddCollectionModal({ isOpen, onClose }: ModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [banner, setBanner] = useState<File | null>(null);
    const [status, setStatus] = useState<TStatus | null>(null);

    const [preview, setPreview] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");

    const uploadImageMutation = useUploadImage();
    const createCollectionMutation = useCreateCollection();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
            <div className="bg-white p-[40px] shadow-lg max-w-3xl w-full">
                <h2 className="text-lg font-bold mb-4">Додавання колекції</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-[20px] justify-between">
                        <div className="flex flex-col gap-[20px] w-[50%]">
                            <div className="flex flex-col">
                                <label htmlFor="name">Назва</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="border-b py-2 px-1 outline-0"
                                    placeholder="Назва колекції"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="path">Шлях</label>
                                <input
                                    id="path"
                                    name="path"
                                    type="text"
                                    className="border-b py-2 px-1 outline-0"
                                    placeholder="Шлях (продублювати назву)"
                                    value={path}
                                    onChange={(e) => setPath(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label
                                    htmlFor="banner"
                                    className="mb-2 font-medium text-gray-700"
                                >
                                    Банер
                                </label>

                                <label
                                    htmlFor="banner"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-black hover:text-white cursor-pointer transition-all duration-200"
                                >
                                    Завантажити зображення
                                </label>

                                <input
                                    id="banner"
                                    name="banner"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="status">Статус</label>
                                <select
                                    name="status"
                                    className="border-b py-2 px-1 outline-0"
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
                        <div className="flex flex-col gap-[20px] w-[50%]">
                            <img
                                className="object-contain h-[340px]"
                                src={preview || "../images/placeholder.png"}
                                alt="Банер"
                            />
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
}
