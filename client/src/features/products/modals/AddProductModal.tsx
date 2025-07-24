"use client";

import { useForm } from "react-hook-form";
import { useState, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

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
import { useCreateProduct } from "../hooks/useProducts";

import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import { toast } from "sonner";

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryId: ICategory["id"];
    collectionPath: ICollection["path"];
    categoryPath: ICategory["path"];
}

interface FormData {
    name: string;
    path: string;
    price: number;
    oldPrice: number;
    available: string;
    description: string;
    composition: string;
    status: TStatus | "";
}

export default function AddProductModal({
    isOpen,
    onClose,
    categoryId,
    collectionPath,
    categoryPath,
}: AddProductModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            path: "",
            price: 0,
            oldPrice: 0,
            available: "false",
            description: "",
            composition: "",
            status: "",
        },
    });

    const [banner, setBanner] = useState<File | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const [images, setImages] = useState<File[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);

    const [colorsToSend, setColorsToSend] = useState<string[]>([]);
    const [sizesToSend, setSizesToSend] = useState<string[]>([]);
    const [typesToSend, setTypesToSend] = useState<string[]>([]);

    const [bannerError, setBannerError] = useState<string | null>(null);
    const [modalMessage, setModalMessage] = useState("");

    const uploadImageMutation = useUploadImage();
    const uploadImagesMutation = useUploadImages();
    const createProductMutation = useCreateProduct();

    const { data: allColors } = useColors();
    const { data: allSizes } = useSizes();
    const { data: allTypes } = useTypes();

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBanner(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
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

    const onSubmit = async (data: FormData) => {
        if (!banner) {
            setBannerError("Оберіть банер");
            return;
        } else {
            setBannerError(null);
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
                    name: data.name.trim(),
                    path: data.path.trim(),
                    price: Number(data.price),
                    oldPrice: Number(data.oldPrice),
                    available: data.available === "true",
                    description: data.description.trim(),
                    composition: data.composition.trim(),
                    status: data.status as TStatus,
                    categoryId,
                    banner: bannerPath,
                    images: uploadImagesResult.paths,
                    colorIds: colorsToSend,
                    sizeIds: sizesToSend,
                    typeIds: typesToSend,
                    views: 0,
                },
            });

            setBanner(null);
            setBannerPreview(null);
            setImages([]);
            setImagesPreview([]);
            setColorsToSend([]);
            setSizesToSend([]);
            setTypesToSend([]);
            reset();
            setModalMessage("");
            onClose();
            toast.success("Товар упішно додано!");
        } catch (err: any) {
            setModalMessage(err?.message || "Не вдалося додати товар");
        }
    };

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Додавання товару"}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[20px]"
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InputField
                            label="Назва"
                            id="addProductName"
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
                            id="addProductPath"
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
                            id="addProductPrice"
                            placeholder="Ціна"
                            type="number"
                            {...register("price", {
                                required: "Введіть ціну",
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: "Ціна має бути не від’ємною",
                                },
                            })}
                            errorMessage={errors.price?.message}
                        />
                        <InputField
                            label="Стара ціна"
                            id="addProductOldPrice"
                            placeholder="Стара ціна"
                            type="number"
                            {...register("oldPrice", {
                                required: "Введіть стару ціну",
                                valueAsNumber: true,
                                min: {
                                    value: 0,
                                    message: "Ціна має бути не від’ємною",
                                },
                            })}
                            errorMessage={errors.oldPrice?.message}
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
                                {...register("available")}
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
                                errors.description?.message
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
                                errors.composition?.message
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

                    {/* Кольори */}
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

                    {/* Банер */}
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
                        {bannerError && (
                            <p className="text-red-500 text-sm mt-1">
                                {bannerError}
                            </p>
                        )}
                    </div>

                    {/* Додаткові зображення */}
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
                </FormFillingWrapper>
                {modalMessage && (
                    <p className="text-red-500 text-sm">{modalMessage}</p>
                )}
                <FormButtonsWrapper>
                    <MonoButton
                        type="button"
                        onClick={() => {
                            setBanner(null);
                            setBannerPreview(null);
                            setImages([]);
                            setImagesPreview([]);
                            setColorsToSend([]);
                            setSizesToSend([]);
                            setTypesToSend([]);
                            reset();
                            setModalMessage("");
                            onClose();
                        }}
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
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
