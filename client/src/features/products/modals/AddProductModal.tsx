"use client";

import { useColors } from "@/features/admin/attributes/product-colors/hooks/useColors";
import { useSizes } from "@/features/admin/attributes/product-sizes/hooks/useSizes";
import { useTypes } from "@/features/admin/attributes/product-types/hooks/useTypes";
import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useUploadImage, useUploadImages } from "@/shared/hooks/useImages";
import { TrashIcon } from "@/shared/icons";
import { TStatus } from "@/shared/types/types";
import InputField from "@/shared/ui/inputs/InputField";
import { statuses } from "@/shared/utils/helpers";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useCreateProduct } from "../hooks/useProducts";
import Image from "next/image";
import MonoButton from "@/shared/ui/buttons/MonoButton";

interface AddProductModalProps {
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
}: AddProductModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [price, setPrice] = useState<number | "">("");
    const [available, setAvailable] = useState(false);
    const [description, setDescription] = useState("");
    const [composition, setComposition] = useState("");
    const [status, setStatus] = useState<TStatus>("INACTIVE");

    const [banner, setBanner] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const [images, setImages] = useState<File[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);

    const [colorsToSend, setColorsToSend] = useState<string[]>([]);
    const [sizesToSend, setSizesToSend] = useState<string[]>([]);
    const [typesToSend, setTypesToSend] = useState<string[]>([]);

    const [message, setMessage] = useState("");

    const uploadImageMutation = useUploadImage();
    const uploadImagesMutation = useUploadImages();
    const createProductMutation = useCreateProduct();

    const { data: allColors } = useColors();
    const { data: allSizes } = useSizes();
    const { data: allTypes } = useTypes();

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBanner(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setImages((prev) => [...prev, ...files]);
        setImagesPreview((prev) => [
            ...prev,
            ...files.map((f) => URL.createObjectURL(f)),
        ]);
    };

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImagesPreview((prev) => prev.filter((_, i) => i !== index));
    };

    const toggleSelect = (
        id: string,
        selected: string[],
        setSelected: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((v) => v !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const handleClose = () => {
        if (bannerPreview) URL.revokeObjectURL(bannerPreview);
        imagesPreview.forEach((url) => URL.revokeObjectURL(url));
        setName("");
        setPath("");
        setPrice("");
        setAvailable(false);
        setDescription("");
        setComposition("");
        setStatus("INACTIVE");
        setBanner(null);
        setBannerPreview(null);
        setImages([]);
        setImagesPreview([]);
        setColorsToSend([]);
        setSizesToSend([]);
        setTypesToSend([]);
        setMessage("");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !name.trim() ||
            !path.trim() ||
            !price ||
            !description.trim() ||
            !composition.trim() ||
            !status
        ) {
            setMessage("Заповніть усі обов'язкові поля!");
            return;
        }
        if (!banner) {
            setMessage("Виберіть банер!");
            return;
        }

        try {
            const uploadBannerResult = await uploadImageMutation.mutateAsync(
                banner
            );
            const bannerPath = uploadBannerResult.path;

            const uploadImagesResult = images.length
                ? await uploadImagesMutation.mutateAsync(images)
                : { paths: [] };

            await createProductMutation.mutateAsync({
                collectionPath,
                categoryPath,
                productData: {
                    name: name.trim(),
                    path: path.trim(),
                    price: Number(price),
                    available,
                    description: description.trim(),
                    composition: composition.trim(),
                    status,
                    categoryId,
                    banner: bannerPath,
                    images: uploadImagesResult.paths,
                    colorIds: colorsToSend,
                    sizeIds: sizesToSend,
                    typeIds: typesToSend,
                    views: 0,
                },
            });

            setMessage("Товар успішно додано!");
            handleClose();
        } catch (error) {
            setMessage("Помилка при створенні товару");
            console.error(error);
        }
    };

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-100 cursor-pointer"
            onClick={handleClose}
        >
            <div
                className="bg-black rounded-xl text-white bg-gradient-to-br from-black/0 to-white/5 border border-white/10 p-[30px] max-h-[80vh] shadow-lg w-[70vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-3xl font-thin mb-6">Додавання товару</h2>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-[20px]"
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InputField
                            label="Назва"
                            value={name}
                            onChangeValue={(e) => setName(e.target.value)}
                            id="addProductName"
                            name="addProductName"
                            placeholder="Назва товару"
                            type="text"
                        />
                        <InputField
                            label="Шлях"
                            value={path}
                            onChangeValue={(e) => setPath(e.target.value)}
                            id="addProductPath"
                            name="addProductPath"
                            placeholder="Шлях"
                            type="text"
                        />
                        <InputField
                            label="Ціна"
                            value={price}
                            onChangeValue={(e) =>
                                setPrice(
                                    e.target.value === ""
                                        ? ""
                                        : Number(e.target.value)
                                )
                            }
                            id="addProductPrice"
                            name="addProductPrice"
                            placeholder="Ціна"
                            type="number"
                        />
                        <div className="flex flex-col gap-[7px]">
                            <label
                                className="font-semibold text-sm"
                                htmlFor="available"
                            >
                                Доступність
                            </label>
                            <select
                                id="available"
                                name="available"
                                className="border border-white/10 rounded p-[10px] outline-0 cursor-pointer bg-black/10"
                                value={available ? "true" : "false"}
                                onChange={(e) =>
                                    setAvailable(e.target.value === "true")
                                }
                            >
                                <option value="true">Доступний</option>
                                <option value="false">Недоступний</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label
                                className="font-semibold text-sm"
                                htmlFor="status"
                            >
                                Статус
                            </label>
                            <select
                                id="status"
                                name="status"
                                className="border border-white/10 rounded p-[10px] outline-0 cursor-pointer bg-black/10"
                                value={status ?? ""}
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

                    <div className="flex flex-col gap-[7px]">
                        <label className="font-semibold text-sm">Опис</label>
                        <textarea
                            className="resize-none border border-white/10 rounded p-[10px] bg-black/10 outline-0"
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-[7px]">
                        <label className="font-semibold text-sm">Склад</label>
                        <textarea
                            className="resize-none border border-white/10 rounded p-[10px] bg-black/10 outline-0"
                            rows={3}
                            value={composition}
                            onChange={(e) => setComposition(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-sm">Кольори</label>
                        <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto border border-white/10 rounded p-2 bg-black/10">
                            {allColors?.map((color) => (
                                <button
                                    key={color.id}
                                    type="button"
                                    onClick={() =>
                                        toggleSelect(
                                            color.id,
                                            colorsToSend,
                                            setColorsToSend
                                        )
                                    }
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        colorsToSend.includes(color.id)
                                            ? "bg-white text-black cursor-default"
                                            : "border border-white/30 hover:bg-white/20"
                                    }`}
                                >
                                    {color.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-sm">Розміри</label>
                        <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto border border-white/10 rounded p-2 bg-black/10">
                            {allSizes?.map((size) => (
                                <button
                                    key={size.id}
                                    type="button"
                                    onClick={() =>
                                        toggleSelect(
                                            size.id,
                                            sizesToSend,
                                            setSizesToSend
                                        )
                                    }
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        sizesToSend.includes(size.id)
                                            ? "bg-white text-black cursor-default"
                                            : "border border-white/30 hover:bg-white/20"
                                    }`}
                                >
                                    {size.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="font-semibold text-sm">Типи</label>
                        <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto border border-white/10 rounded p-2 bg-black/10">
                            {allTypes?.map((type) => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() =>
                                        toggleSelect(
                                            type.id,
                                            typesToSend,
                                            setTypesToSend
                                        )
                                    }
                                    className={`px-3 py-1 rounded-full text-sm ${
                                        typesToSend.includes(type.id)
                                            ? "bg-white text-black cursor-default"
                                            : "border border-white/30 hover:bg-white/20"
                                    }`}
                                >
                                    {type.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[7px] w-full max-w-[300px]">
                        <label
                            htmlFor="banner"
                            className="text-sm font-semibold cursor-pointer"
                        >
                            Банер
                        </label>
                        <label
                            htmlFor="banner"
                            className="min-h-[100px] border border-dashed border-white/20 mt-2 flex items-center justify-center cursor-pointer bg-black/10 hover:bg-black/20 rounded-xl overflow-hidden"
                        >
                            {bannerPreview ? (
                                <Image
                                    src={bannerPreview}
                                    alt="banner"
                                    width={250}
                                    height={250}
                                    className="object-cover"
                                />
                            ) : (
                                <span className="text-5xl text-white">+</span>
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

                    <div className="flex flex-col gap-[7px] w-full max-w-[300px]">
                        <label
                            htmlFor="images"
                            className="text-sm font-semibold"
                        >
                            Додаткові зображення
                        </label>
                        <label
                            htmlFor="images"
                            className="min-h-[100px] border border-dashed border-white/20 mt-2 flex items-center justify-center cursor-pointer bg-black/10 hover:bg-black/20 rounded-xl overflow-hidden"
                        >
                            <span className="text-4xl text-gray-400">+</span>
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
                            {imagesPreview.map((src, i) => (
                                <div
                                    key={i}
                                    className="relative group w-[100px] h-[100px] group cursor-pointer"
                                    onClick={() => removeImage(i)}
                                >
                                    <Image
                                        src={src}
                                        alt={`img-${i}`}
                                        width={100}
                                        height={100}
                                        className="object-cover rounded-md"
                                    />
                                    <div className="absolute flex items-center justify-center opacity-0 rounded group-hover:opacity-100 top-0 right-0 bg-black/40 w-full h-full transition-all duration-200">
                                        <TrashIcon className=" w-[35px] fill-none  stroke-white stroke-[1.5] " />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {message && <p className="mt-4 text-red-500">{message}</p>}

                    <div className="flex justify-end gap-4 mt-6">
                        <MonoButton
                            type="button"
                            onClick={handleClose}
                            disabled={
                                uploadImageMutation.isPending ||
                                createProductMutation.isPending
                            }
                        >
                            Скасувати
                        </MonoButton>
                        <MonoButton
                            type="submit"
                            disabled={
                                uploadImageMutation.isPending ||
                                createProductMutation.isPending
                            }
                        >
                            {uploadImageMutation.isPending ||
                            createProductMutation.isPending
                                ? "Завантаження..."
                                : "Додати"}
                        </MonoButton>
                    </div>
                </form>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
