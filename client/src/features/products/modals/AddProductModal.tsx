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
import { TAvailble, TStatus } from "@/shared/types/types";
import InputField from "@/shared/ui/inputs/InputField";
import { availables, statuses } from "@/shared/utils/helpers";
import { useCreateProduct } from "../hooks/useProducts";

import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import { toast } from "sonner";
import BasicSelector from "@/shared/ui/selectors/BasicSelector";
import BasicTextarea from "@/shared/ui/textareas/BasicTextarea";
import { Label } from "recharts";

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
    available: TAvailble;
    description: string;
    composition: string;
    status: TStatus;
    colorIds?: string[];
    sizeIds?: string[];
    typeIds?: string[];
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
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            path: "",
            price: 0,
            oldPrice: 0,
            available: "Не доступно",
            description: "",
            composition: "",
            status: "Не активно",
            colorIds: [],
            sizeIds: [],
            typeIds: [],
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

    const renderAttributeField = (
        label: string,
        allItems: { id: string; name: string }[] | undefined,
        selected: string[],
        setSelected: React.Dispatch<React.SetStateAction<string[]>>,
        error?: string
    ) => (
        <div className="flex flex-col gap-2">
            <Label>{label}</Label>
            <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto border border-white/10 rounded p-2 bg-black/10">
                {allItems?.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                            console.log(item);

                            toggleSelect(item.id, selected, setSelected);
                        }}
                        className={`px-3 py-1 rounded-full text-sm ${
                            selected.includes(item.id)
                                ? "bg-white text-black cursor-default"
                                : "border border-white/30 hover:bg-white/20"
                        }`}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );

    const onSubmit = async (data: FormData) => {
        try {
            let hasError = false;

            if (colorsToSend.length === 0) {
                setError("colorIds", {
                    type: "manual",
                    message: "Оберіть хоча б один колір",
                });
                hasError = true;
            } else clearErrors("colorIds");

            if (sizesToSend.length === 0) {
                setError("sizeIds", {
                    type: "manual",
                    message: "Оберіть хоча б один розмір",
                });
                hasError = true;
            } else clearErrors("sizeIds");

            if (typesToSend.length === 0) {
                setError("typeIds", {
                    type: "manual",
                    message: "Оберіть хоча б один тип",
                });
                hasError = true;
            } else clearErrors("typeIds");

            if (!banner) {
                setBannerError("Оберіть банер");
                hasError = true;
                return;
            } else {
                setBannerError(null);
            }

            console.log(typesToSend);

            if (hasError) return;
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
                    available: data.available,
                    description: data.description.trim(),
                    composition: data.composition.trim(),
                    status: data.status,
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
                            label="Назва*"
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
                            label="Шлях*"
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
                            label="Ціна*"
                            id="addProductPrice"
                            placeholder="Ціна"
                            type="number"
                            {...register("price", {
                                required: "Введіть ціну",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Ціна має бути не менше 1",
                                },
                            })}
                            errorMessage={errors.price?.message}
                        />
                        <InputField
                            label="Стара ціна*"
                            id="addProductOldPrice"
                            placeholder="Стара ціна"
                            type="number"
                            {...register("oldPrice", {
                                required: "Введіть стару ціну",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Ціна має бути не менше 1",
                                },
                            })}
                            errorMessage={errors.oldPrice?.message}
                        />

                        <BasicSelector<string>
                            label={"Доступність*"}
                            register={{
                                ...register("available", {
                                    required: "Оберіть доступність",
                                }),
                            }}
                            itemsList={availables}
                            basicOptionLabel="Оберіть доступність"
                            getOptionLabel={(available) => available}
                            getOptionValue={(available) => available}
                            errorMessage={errors.available?.message}
                        />
                        <BasicSelector<string>
                            label={"Статус*"}
                            register={{
                                ...register("status", {
                                    required: "Оберіть статус",
                                }),
                            }}
                            itemsList={statuses}
                            basicOptionLabel="Оберіть статус"
                            getOptionLabel={(status) => status}
                            getOptionValue={(status) => status}
                            errorMessage={errors.status?.message}
                        />
                    </div>

                    <BasicTextarea
                        label="Опис*"
                        register={{
                            ...register("description", {
                                required: "Введіть опис",
                            }),
                        }}
                        errorMessage={errors.description?.message}
                    />

                    <BasicTextarea
                        label="Склад*"
                        register={{
                            ...register("composition", {
                                required: "Введіть склад",
                            }),
                        }}
                        errorMessage={errors.composition?.message}
                    />

                    {/* Кольори */}
                    {renderAttributeField(
                        "Кольори",
                        allColors,
                        colorsToSend,
                        setColorsToSend,
                        errors.colorIds?.message
                    )}

                    {/* Розміри */}
                    {renderAttributeField(
                        "Розміри",
                        allSizes,
                        sizesToSend,
                        setSizesToSend,
                        errors.sizeIds?.message
                    )}

                    {/* Типи */}
                    {renderAttributeField(
                        "Типи",
                        allTypes,
                        typesToSend,
                        setTypesToSend,
                        errors.typeIds?.message
                    )}

                    {/* Банер */}
                    <div className="flex flex-col gap-[7px] w-full max-w-[300px]">
                        <Label>Банер</Label>
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
                        <Label>Додаткові зображення</Label>
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
