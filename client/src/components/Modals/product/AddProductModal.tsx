"use client";

import { statuses } from "@/lib/helpers/helpers";
import { useCreateProduct } from "@/lib/hooks/useProducts";
import { ICategory, ICollection, IProduct, TStatus } from "@/types/types";
import { useState } from "react";
import Image from "next/image";
import { useUploadImage, useUploadImages } from "@/lib/hooks/useImages";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryId: ICategory["id"];
    collectionPath: ICollection["path"];
    categoryPath: ICategory["path"];
}

export default function AddProductModal({
    isOpen,
    onClose,
    categoryId,
    collectionPath,
    categoryPath,
}: ModalProps) {
    const [name, setName] = useState(""),
        [path, setPath] = useState(""),
        [price, setPrice] = useState<number | null>(null),
        [available, setAvailable] = useState<boolean | null>(null),
        [description, setDescription] = useState(""),
        [composition, setComposition] = useState(""),
        [status, setStatus] = useState<TStatus | null>(null);

    const [banner, setBanner] = useState<File | null>(null),
        [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const [images, setImages] = useState<File[]>([]),
        [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [message, setMessage] = useState("");

    const uploadImageMutation = useUploadImage();
    const uploadImagesMutation = useUploadImages();

    const createProductMutation = useCreateProduct(
        collectionPath,
        categoryPath
    );

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBanner(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages((prev) => [...prev, ...files]);
        setImagePreviews((prev) => [
            ...prev,
            ...files.map((f) => URL.createObjectURL(f)),
        ]);
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleClose = () => {
        setName("");
        setPath("");
        setPrice(null);
        setAvailable(null);
        setDescription("");
        setComposition("");
        setStatus(null);
        setBanner(null);
        setBannerPreview(null);
        setImages([]);
        setImagePreviews([]);
        setMessage("");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !path || !status || !price || !description || !composition)
            return setMessage("Заповніть усі поля!");
        if (!banner) return setMessage("Оберіть банер!");
        try {
            const uploadBannerResult = await uploadImageMutation.mutateAsync(
                banner
            );
            const bannerPath = uploadBannerResult.path;

            const uploadImagesResults = await uploadImagesMutation.mutateAsync(
                images
            );
            const imagesPaths = uploadImagesResults.paths;

            await createProductMutation.mutateAsync({
                name,
                path,
                views: 0,
                status,
                categoryId,
                id: "",
                createdAt: "",
                updatedAt: "",
                price,
                available: available || false,
                description,
                composition,
                banner: bannerPath,
                sizes: [],
                types: [],
                colors: [],
                images: imagesPaths,
            });
            setMessage("Товар успішно додано!");
            handleClose();
        } catch (error) {
            setMessage("Помилка при створенні товару");
            console.error(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white p-[40px] shadow-xl max-w-4xl h-[95vh] w-full rounded-md overflow-y-auto">
                <h2 className="text-xl font-bold mb-4 ">Додавання товару</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-[20px]">
                        <div className="flex flex-col gap-[20px] w-1/2">
                            <div className="flex flex-col">
                                <label>Назва товару</label>
                                <input
                                    className="border-b py-2 px-1 outline-0"
                                    value={name}
                                    placeholder="Назва"
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold">
                                    Шлях
                                </label>
                                <input
                                    className="border-b py-2 px-1 outline-0"
                                    value={path}
                                    placeholder="Шлях"
                                    onChange={(e) => setPath(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold">
                                    Ціна
                                </label>
                                <input
                                    className="border-b py-2 px-1 outline-0"
                                    value={price || ""}
                                    placeholder="Ціна"
                                    onChange={(e) => setPrice(+e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold">
                                    Опис
                                </label>
                                <textarea
                                    className="border-b py-2 px-1 outline-0"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold">
                                    Склад
                                </label>
                                <textarea
                                    className="border-b py-2 px-1 outline-0"
                                    value={composition}
                                    onChange={(e) =>
                                        setComposition(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold">
                                    Доступність
                                </label>
                                <select
                                    className="border-b py-2 px-1 outline-0"
                                    value={
                                        available === null
                                            ? ""
                                            : available
                                            ? "true"
                                            : "false"
                                    }
                                    onChange={(e) =>
                                        setAvailable(e.target.value === "true")
                                    }
                                >
                                    <option value="" disabled>
                                        Оберіть доступність
                                    </option>
                                    <option value="true">Доступний</option>
                                    <option value="false">Недоступний</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label className="text-sm font-semibold">
                                    Статус
                                </label>
                                <select
                                    className="border-b py-2 px-1 outline-0"
                                    value={status || ""}
                                    onChange={(e) =>
                                        setStatus(e.target.value as TStatus)
                                    }
                                >
                                    <option value="" disabled>
                                        Оберіть статус
                                    </option>
                                    {statuses.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
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
                                    {bannerPreview ? (
                                        <Image
                                            src={bannerPreview}
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

                            <div>
                                <label
                                    htmlFor="images"
                                    className="text-sm font-semibold"
                                >
                                    Додаткові зображення
                                </label>
                                <label
                                    htmlFor="images"
                                    className="min-h-[100px] max-w-[300px] border border-dashed border-gray-400 mt-2 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-md overflow-hidden"
                                >
                                    <span className="text-4xl text-gray-400">
                                        +
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    id="images"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImagesChange}
                                    className="hidden"
                                />

                                <div className="flex flex-wrap gap-3 mt-4">
                                    {imagePreviews.map((src, i) => (
                                        <div
                                            key={i}
                                            className="relative group w-[100px] h-[100px]"
                                        >
                                            <Image
                                                src={src}
                                                alt={`img-${i}`}
                                                width={100}
                                                height={100}
                                                className="object-cover rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(i)}
                                                className="absolute top-0 right-0 bg-black text-white px-[8px] py-[2px] opacity-0 group-hover:opacity-100 transition cursor-pointer"
                                            >
                                                Х
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {message && <p className="text-red-500 mt-4">{message}</p>}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                        >
                            Відмінити
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded"
                        >
                            Додати
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
