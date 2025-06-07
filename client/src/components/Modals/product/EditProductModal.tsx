"use client";
import Image from "next/image";
import { useEffect, useState, ChangeEvent } from "react";
import { statuses } from "@/lib/helpers/helpers";
import { IProduct, TStatus } from "@/types/types";
import { useUploadImage, useUploadImages } from "@/lib/hooks/useImages";
// import { useEditProduct } from "@/lib/hooks/useProducts";

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: IProduct;
}

export default function EditProductModal({
    isOpen,
    onClose,
    item,
}: EditProductModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [price, setPrice] = useState<number | null>(null);
    const [available, setAvailable] = useState<boolean | null>(null);
    const [description, setDescription] = useState("");
    const [composition, setComposition] = useState("");
    const [status, setStatus] = useState<TStatus | null>(null);

    const [banner, setBanner] = useState<File | string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const [images, setImages] = useState<(File | string)[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [message, setMessage] = useState("");

    const uploadImageMutation = useUploadImage();
    const uploadImagesMutation = useUploadImages();
    //   const editProductMutation = useEditProduct();

    useEffect(() => {
        if (item) {
            setName(item.name);
            setPath(item.path);
            setPrice(item.price);
            setAvailable(item.available);
            setDescription(item.description);
            setComposition(item.composition);
            setStatus(item.status);
            setBanner(item.banner);
            setBannerPreview(item.banner);
            setImages(item.images);
            setImagePreviews(item.images);
        }
    }, [item]);

    const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBanner(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setImages((prev) => [...prev, ...files]);
        setImagePreviews((prev) => [
            ...prev,
            ...files.map((file) => URL.createObjectURL(file)),
        ]);
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async () => {
        if (!name || !path || !status || !price || !description || !composition)
            return setMessage("Заповніть усі поля!");

        try {
            let bannerPath = typeof banner === "string" ? banner : "";
            if (banner instanceof File) {
                const uploadResult = await uploadImageMutation.mutateAsync(
                    banner
                );
                bannerPath = uploadResult.path;
            }

            const newImages: string[] = [];

            for (const img of images) {
                if (typeof img === "string") {
                    newImages.push(img);
                } else {
                    const result = await uploadImageMutation.mutateAsync(img);
                    newImages.push(result.path);
                }
            }

            //   await editProductMutation.mutateAsync({
            //     id: product.id,
            //     data: {
            //       name,
            //       path,
            //       price,
            //       available: available || false,
            //       description,
            //       composition,
            //       status,
            //       banner: bannerPath,
            //       images: newImages,
            //     },
            //   });

            setMessage("Товар успішно оновлено!");
            onClose();
        } catch (err) {
            console.error("Помилка при оновленні товару:", err);
            setMessage("Помилка при оновленні товару");
        }
    };

    if (!isOpen || !item) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white p-[40px] shadow-xl max-w-4xl w-full rounded-md overflow-y-auto h-[95vh]">
                <h2 className="text-xl font-bold mb-4">
                    Редагування товару: {item.name}
                </h2>
                <div className="flex gap-[20px]">
                    <div className="flex flex-col gap-[20px] w-1/2">
                        <div className="flex flex-col gap-[7px]">
                            <label>Назва товару</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                            />
                        </div>

                        <div className="flex flex-col gap-[7px]">
                            <label>Шлях</label>
                            <input
                                value={path}
                                onChange={(e) => setPath(e.target.value)}
                                className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                            />
                        </div>

                        <div className="flex flex-col gap-[7px]">
                            <label>Ціна</label>
                            <input
                                value={price || ""}
                                onChange={(e) => setPrice(+e.target.value)}
                                className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                            />
                        </div>

                        <div className="flex flex-col gap-[7px]">
                            <label>Опис</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                            />
                        </div>

                        <div className="flex flex-col gap-[7px]">
                            <label>Склад</label>
                            <textarea
                                value={composition}
                                onChange={(e) => setComposition(e.target.value)}
                                className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                            />
                        </div>

                        <div className="flex flex-col gap-[7px]">
                            <label>Доступність</label>
                            <select
                                className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
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

                        <div className="flex flex-col gap-[7px]">
                            <label>Статус</label>
                            <select
                                className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
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
                            <label htmlFor="banner">Банер</label>
                            <label
                                htmlFor="banner"
                                className="min-h-[100px] max-w-[300px] border border-dashed border-gray-400 mt-2 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-md overflow-hidden"
                            >
                                {bannerPreview ? (
                                    bannerPreview.startsWith("blob:") ||
                                    bannerPreview.startsWith("data:") ? (
                                        <img
                                            src={bannerPreview}
                                            alt="banner-preview"
                                            className="object-cover w-[250px] h-[300px]"
                                        />
                                    ) : (
                                        <Image
                                            src={`http://localhost:5000${bannerPreview}`}
                                            alt="banner"
                                            width={250}
                                            height={300}
                                            className="object-cover"
                                        />
                                    )
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
                            <label htmlFor="images">Додаткові зображення</label>
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
                                        {src.startsWith("blob:") ||
                                        src.startsWith("data:") ? (
                                            <img
                                                src={src}
                                                alt={`img-${i}`}
                                                className="object-cover w-full h-full rounded-md"
                                            />
                                        ) : (
                                            <Image
                                                src={`http://localhost:5000${src}`}
                                                alt={`img-${i}`}
                                                width={100}
                                                height={100}
                                                className="object-cover rounded-md"
                                            />
                                        )}
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
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                        Скасувати
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="px-4 py-2 bg-black text-white hover:bg-gray-800 rounded"
                    >
                        Зберегти
                    </button>
                </div>
            </div>
        </div>
    );
}
