"use client";
import { useEffect, useState, ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import { createPortal } from "react-dom";
import Image from "next/image";

import { useColors } from "@/features/admin/attributes/product-colors/hooks/useColors";
import { useSizes } from "@/features/admin/attributes/product-sizes/hooks/useSizes";
import { useTypes } from "@/features/admin/attributes/product-types/hooks/useTypes";

import { ICategory } from "@/features/categories/types/categories.types";
import { ICollection } from "@/features/collections/types/collections.types";
import { IProduct } from "../types/products.types";

import { useUploadImage } from "@/shared/hooks/useImages";
import { useEditProduct } from "../hooks/useProducts";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";

import { TrashIcon } from "@/shared/icons";
import { TStatus } from "@/shared/types/types";
import { statuses } from "@/shared/utils/helpers";

import InputField from "@/shared/ui/inputs/InputField";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionPath: ICollection["path"];
    categoryPath: ICategory["path"];
    product: IProduct;
}

interface FormData {
    name: string;
    path: string;
    price: number;
    available: "true" | "false";
    description: string;
    composition: string;
    status: TStatus | "";
}

export default function EditProductModal({
    isOpen,
    onClose,
    collectionPath,
    categoryPath,
    product,
}: EditProductModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            path: "",
            price: 0,
            available: "false",
            description: "",
            composition: "",
            status: "",
        },
    });

    const [banner, setBanner] = useState<File | string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const [images, setImages] = useState<(File | string)[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [colorsToSend, setColorsToSend] = useState<string[]>([]);
    const [sizesToSend, setSizesToSend] = useState<string[]>([]);
    const [typesToSend, setTypesToSend] = useState<string[]>([]);

    const uploadImageMutation = useUploadImage();
    const editProductMutation = useEditProduct();

    const { data: allColors } = useColors();
    const { data: allSizes } = useSizes();
    const { data: allTypes } = useTypes();

    useEscapeKeyClose({ isOpen, onClose });

    // Заповнення форми при завантаженні продукту
    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                path: product.path,
                price: product.price,
                available: product.available ? "true" : "false",
                description: product.description,
                composition: product.composition,
                status: product.status,
            });
            setColorsToSend(product.productColors.map((pc) => pc.color.id));
            setSizesToSend(product.productSizes.map((ps) => ps.size.id));
            setTypesToSend(product.productTypes.map((pt) => pt.type.id));
            setBanner(product.banner);
            setBannerPreview(product.banner);
            setImages(product.images);
            setImagePreviews(product.images);
        }
    }, [product, reset]);

    // Обробка вибору банера
    const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBanner(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    // Обробка вибору додаткових зображень
    const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        setImages((prev) => [...prev, ...files]);
        setImagePreviews((prev) => [
            ...prev,
            ...files.map((f) => URL.createObjectURL(f)),
        ]);
    };

    // Видалення зображення за індексом
    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    };

    // Тогл вибору для кольорів, розмірів, типів
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

    // Відправка форми
    const onSubmit = async (data: FormData) => {
        try {
            // Завантаження банера, якщо файл
            let bannerPath = "";
            if (typeof banner === "string" && banner) {
                bannerPath = banner;
            } else if (banner instanceof File) {
                const uploadResult = await uploadImageMutation.mutateAsync(
                    banner
                );
                bannerPath = uploadResult.path;
            } else {
                // Якщо банер не вибрано — можна вивести помилку або просто не оновлювати
                // Тут пропущено, залежно від логіки можна додати
            }

            // Завантаження нових додаткових зображень
            const newImages: string[] = [];
            for (const img of images) {
                if (typeof img === "string") {
                    newImages.push(img);
                } else {
                    const uploadResult = await uploadImageMutation.mutateAsync(
                        img
                    );
                    newImages.push(uploadResult.path);
                }
            }

            await editProductMutation.mutateAsync({
                collectionPath,
                categoryPath,
                productPath: product.path,
                productData: {
                    name: data.name.trim(),
                    path: data.path.trim(),
                    price: data.price,
                    available: data.available === "true",
                    description: data.description.trim(),
                    composition: data.composition.trim(),
                    status: data.status as TStatus,
                    banner: bannerPath,
                    images: newImages,
                    colorIds: colorsToSend,
                    sizeIds: sizesToSend,
                    typeIds: typesToSend,
                },
            });

            onClose();
        } catch (err: any) {
            console.error("Помилка при оновленні товару:", err);
            // Тут можна показати повідомлення користувачу
        }
    };

    if (!isOpen || !product) return null;

    function getFullImageUrl(src: string | null | undefined) {
        if (!src) return "";
        // Якщо це локальний URL з бекенда, наприклад /images/abc.jpg
        if (src.startsWith("/images/")) {
            return `http://localhost:5000${src}`;
        }
        // Якщо це блоб або дата URL, повертаємо як є
        if (src.startsWith("blob:") || src.startsWith("data:")) {
            return src;
        }
        // Якщо повний URL — повертаємо без змін
        return src;
    }

    const bannerDisplaySrc = bannerPreview
        ? getFullImageUrl(bannerPreview)
        : typeof banner === "string"
        ? getFullImageUrl(banner)
        : "";

    const imageDisplayPreviews = imagePreviews.map((src) =>
        getFullImageUrl(src)
    );

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle="Редагування товару">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[20px]"
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InputField
                            label="Назва"
                            id="editProductName"
                            placeholder="Назва товару"
                            type="text"
                            {...register("name", {
                                required: "Введіть назву",
                                minLength: {
                                    value: 3,
                                    message: "Мінімум 3 символи",
                                },
                            })}
                            errorMessage={errors.name?.message}
                        />
                        <InputField
                            label="Шлях"
                            id="editProductPath"
                            placeholder="Шлях"
                            type="text"
                            {...register("path", {
                                required: "Введіть шлях",
                                minLength: {
                                    value: 3,
                                    message: "Мінімум 3 символи",
                                },
                            })}
                            errorMessage={errors.path?.message}
                        />
                        <InputField
                            label="Ціна"
                            id="editProductPrice"
                            placeholder="Ціна"
                            type="number"
                            {...register("price", {
                                required: "Введіть ціну",
                                min: {
                                    value: 0,
                                    message: "Ціна має бути не від’ємною",
                                },
                                valueAsNumber: true,
                            })}
                            errorMessage={errors.price?.message}
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
                                {...register("available", { required: true })}
                                className="border border-white/10 rounded p-[10px] outline-0 cursor-pointer bg-black/10"
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
                                {...register("status", {
                                    required: "Оберіть статус",
                                })}
                                className="border border-white/10 rounded p-[10px] outline-0 cursor-pointer bg-black/10"
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
                            {errors.status && (
                                <p className="text-red-500 text-sm">
                                    {errors.status.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[7px]">
                        <label className="font-semibold text-sm">Опис</label>
                        <textarea
                            {...register("description", {
                                required: "Введіть опис",
                            })}
                            className={`resize-none border ${
                                errors.description
                                    ? "border-red-500"
                                    : "border-white/10"
                            } rounded p-[10px] bg-black/10 outline-0`}
                            rows={3}
                        />
                        {errors.description && (
                            <p className="text-red-500 text-sm">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-[7px]">
                        <label className="font-semibold text-sm">Склад</label>
                        <textarea
                            {...register("composition", {
                                required: "Введіть склад",
                            })}
                            className={`resize-none border ${
                                errors.composition
                                    ? "border-red-500"
                                    : "border-white/10"
                            } rounded p-[10px] bg-black/10 outline-0`}
                            rows={3}
                        />
                        {errors.composition && (
                            <p className="text-red-500 text-sm">
                                {errors.composition.message}
                            </p>
                        )}
                    </div>

                    {/* Вибір кольорів */}
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

                    {/* Вибір розмірів */}
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

                    {/* Вибір типів */}
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

                    {/* Банер і зображення */}
                    <div className="flex flex-col gap-[7px] w-full max-w-[300px]">
                        <label
                            htmlFor="banner"
                            className="text-sm font-semibold"
                        >
                            Банер
                        </label>
                        <label
                            htmlFor="banner"
                            className="min-h-[100px] max-w-[300px] border border-dashed border-white/20 bg-black/10 mt-2 flex justify-center cursor-pointer rounded-md overflow-hidden"
                        >
                            {bannerDisplaySrc ? (
                                <Image
                                    src={bannerDisplaySrc}
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

                    <div className="flex flex-col gap-[7px] w-full max-w-[300px]">
                        <label
                            htmlFor="images"
                            className="text-sm font-semibold cursor-pointer"
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
                            {imageDisplayPreviews.map((src, i) => (
                                <div
                                    key={i}
                                    className="relative group w-[100px] h-[100px] cursor-pointer"
                                    onClick={() => removeImage(i)}
                                >
                                    <Image
                                        src={src}
                                        alt={`img-${i}`}
                                        width={100}
                                        height={100}
                                        className="object-contain rounded-md"
                                    />
                                    <div className="absolute flex items-center justify-center opacity-0 rounded group-hover:opacity-100 top-0 right-0 bg-black/40 w-full h-full transition-all duration-200">
                                        <TrashIcon className="w-[35px] fill-none stroke-white stroke-[1.5]" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FormFillingWrapper>

                <FormButtonsWrapper>
                    <MonoButton
                        type="button"
                        onClick={() => {
                            reset();
                            setBanner(null);
                            setBannerPreview(null);
                            setImages([]);
                            setImagePreviews([]);
                            setColorsToSend([]);
                            setSizesToSend([]);
                            setTypesToSend([]);
                            onClose();
                        }}
                        disabled={
                            uploadImageMutation.isPending ||
                            editProductMutation.isPending
                        }
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={
                            uploadImageMutation.isPending ||
                            editProductMutation.isPending
                        }
                    >
                        {uploadImageMutation.isPending ||
                        editProductMutation.isPending
                            ? "Завантаження..."
                            : "Зберегти"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
