"use client";
import Image from "next/image";
import { useEffect, useState, ChangeEvent } from "react";
import { statuses } from "@/lib/helpers/helpers";
import { TStatus } from "@/types/types";
import { useUploadImage, useUploadImages } from "@/lib/hooks/useImages";
import { useEditProduct } from "@/lib/hooks/useProducts";
import { createPortal } from "react-dom";
import { ICollection } from "@/types/collection/collection.types";
import { ICategory } from "@/types/category/category.types";
import { IProduct } from "@/types/product/product.types";
import InputField from "@/components/AdminPage/components/InputField";
import TrashIcon from "@/components/Icons/TrashIcon";
import { IColor } from "@/types/color/color.types";
import { ISize } from "@/types/size/size.types";
import { IType } from "@/types/type/type.types";
import { useColors } from "@/lib/hooks/useColors";
import { useSizes } from "@/lib/hooks/useSizes";
import { useTypes } from "@/lib/hooks/useTypes";

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionPath: ICollection["path"];
    categoryPath: ICategory["path"];
    product: IProduct;
}

export default function EditProductModal({
    isOpen,
    onClose,
    collectionPath,
    categoryPath,
    product,
}: EditProductModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [price, setPrice] = useState<number>(0);
    const [available, setAvailable] = useState<boolean | null>(null);
    const [description, setDescription] = useState("");
    const [composition, setComposition] = useState("");
    const [status, setStatus] = useState<TStatus | null>(null);

    const [banner, setBanner] = useState<File | string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const [images, setImages] = useState<(File | string)[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const [colorsToSend, setColorsToSend] = useState<IColor[] | []>([]);
    const [sizesToSend, setSizesToSend] = useState<ISize[] | []>([]);
    const [typesToSend, setTypesToSend] = useState<IType[] | []>([]);

    const [message, setMessage] = useState("");

    const uploadImageMutation = useUploadImage();
    // const uploadImagesMutation = useUploadImages();

    const editProductMutation = useEditProduct();

    const { data: allColors, isLoading: isLoadingColors } = useColors();
    const { data: allTypes, isLoading: isLoadingTypes } = useTypes();
    const { data: allSizes, isLoading: isLoadingSizes } = useSizes();

    useEffect(() => {
        if (product) {
            setName(product.name);
            setPath(product.path);
            setPrice(product.price);
            setAvailable(product.available);
            setDescription(product.description);
            setComposition(product.composition);
            setStatus(product.status);
            setColorsToSend(product.productColors.map((item) => item.color));
            setSizesToSend(product.productSizes.map((item) => item.size));
            setTypesToSend(product.productTypes.map((item) => item.type));
            setBanner(product.banner);
            setBannerPreview(product.banner);
            setImages(product.images);
            setImagePreviews(product.images);
        }
    }, [product]);

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

    const handleAddColor = (color: IColor) => {
        setColorsToSend((prevColors) => {
            if (prevColors.some((c) => c.id === color.id)) {
                return prevColors;
            }
            return [...prevColors, color];
        });
    };

    const handleRemoveColor = (colorId: string) => {
        setColorsToSend((prevColors) =>
            prevColors.filter((c) => c.id !== colorId)
        );
    };

    const handleAddSize = (size: ISize) => {
        setSizesToSend((prevSizes) => {
            if (prevSizes.some((s) => s.id === size.id)) {
                return prevSizes;
            }
            return [...prevSizes, size];
        });
    };

    const handleRemoveSize = (sizeId: string) => {
        setSizesToSend((prevSizes) => prevSizes.filter((s) => s.id !== sizeId));
    };

    const handleAddType = (type: IType) => {
        setTypesToSend((prevTypes) => {
            if (prevTypes.some((t) => t.id === type.id)) {
                return prevTypes;
            }
            return [...prevTypes, type];
        });
    };

    const handleRemoveType = (typeId: string) => {
        setTypesToSend((prevTypes) => prevTypes.filter((t) => t.id !== typeId));
    };

    const handleClose = () => {
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !name ||
            !path ||
            !status ||
            !price ||
            !description ||
            !composition
        ) {
            return setMessage("Заповніть усі поля!");
        }
        if (!banner) {
            return setMessage("Оберіть банер!");
        }

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

            await editProductMutation.mutateAsync({
                collectionPath,
                categoryPath,
                productPath: product.path,
                productData: {
                    name,
                    path,
                    price: price || 0,
                    available: available || false,
                    description,
                    composition,
                    colorIds: colorsToSend.map((c) => c.id),
                    sizeIds: sizesToSend.map((s) => s.id),
                    typeIds: typesToSend.map((t) => t.id),
                    status,
                    banner: bannerPath,
                    images: newImages,
                },
            });

            setMessage("Товар успішно оновлено!");
            handleClose();
        } catch (err) {
            console.error("Помилка при оновленні товару:", err);
            setMessage("Помилка при оновленні товару");
        }
    };

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !product) return null;

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/70 flex items-center products-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-white p-[30px] h-auto max-h-[80vh] shadow-lg w-[54vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-xl font-bold mb-4">
                    Редагування товару: {product.name}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[20px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                            <InputField
                                label={"Назва"}
                                value={name}
                                onChangeValue={(e) => setName(e.target.value)}
                                id={"editProductName"}
                                name={"editProductName"}
                                placeholder={"Назва колекції"}
                                type={"text"}
                            />
                            <InputField
                                label={"Шлях"}
                                value={path}
                                onChangeValue={(e) => setName(e.target.value)}
                                id={"editProductPath"}
                                name={"editProductPath"}
                                placeholder={"Шлях"}
                                type={"text"}
                            />
                            <InputField
                                label={"Назва"}
                                value={name}
                                onChangeValue={(e) => setName(e.target.value)}
                                id={"editCollectionName"}
                                name={"editCollectionName"}
                                placeholder={"Назва колекції"}
                                type={"text"}
                            />
                            <InputField
                                label={"Ціна"}
                                value={price}
                                onChangeValue={(e) => setPrice(+e.target.value)}
                                id={"editProductPrice"}
                                name={"editProductPrice"}
                                placeholder={"Ціна"}
                                type={"number"}
                            />
                            <div className="flex flex-col gap-[7px]">
                                <label className="text-sm font-semibold">
                                    Опис
                                </label>
                                <textarea
                                    className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-[7px]">
                                <label className="text-sm font-semibold">
                                    Склад
                                </label>
                                <textarea
                                    className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                                    value={composition}
                                    onChange={(e) =>
                                        setComposition(e.target.value)
                                    }
                                />
                            </div>
                            <div className="flex flex-col gap-[7px]">
                                <label className="text-sm font-semibold">
                                    Доступність
                                </label>
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
                                <label className="text-sm font-semibold">
                                    Статус
                                </label>
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-[20px]">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">
                                    Оберіть кольори:
                                </label>
                                <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded max-h-[100px] overflow-y-auto">
                                    {isLoadingColors && (
                                        <p>Завантаження кольорів...</p>
                                    )}
                                    {allColors?.map((color) => (
                                        <button
                                            key={color.id}
                                            type="button"
                                            onClick={() =>
                                                handleAddColor(color)
                                            }
                                            className={`px-3 py-1 rounded-full text-sm flex items-center gap-1
                              ${
                                  colorsToSend.some((c) => c.id === color.id)
                                      ? `bg-black text-white cursor-not-allowed`
                                      : `border border-gray-300 text-black bg-gray-50 hover:bg-gray-200 cursor-pointer`
                              }`}
                                        >
                                            {color.name}
                                            <div
                                                className="w-4 h-4 rounded-full border border-gray-400"
                                                style={{
                                                    backgroundColor:
                                                        color.hexCode ||
                                                        "#FFFFFF",
                                                }}
                                            ></div>
                                        </button>
                                    ))}
                                    {allColors?.length === 0 &&
                                        !isLoadingColors && (
                                            <p>Кольори не знайдено.</p>
                                        )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">
                                    Обрані кольори:
                                </label>
                                <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded max-h-[100px] overflow-y-auto">
                                    {colorsToSend.length > 0 ? (
                                        colorsToSend.map((color) => (
                                            <div
                                                key={color.id}
                                                className="flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-sm cursor-pointer"
                                                onClick={() =>
                                                    handleRemoveColor(color.id)
                                                }
                                            >
                                                {color.name}
                                                <div
                                                    className="w-4 h-4 rounded-full border border-gray-400"
                                                    style={{
                                                        backgroundColor:
                                                            color.hexCode ||
                                                            "#FFFFFF",
                                                    }}
                                                ></div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">
                                            Не обрано жодного кольору.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">
                                    Оберіть розміри:
                                </label>
                                <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded max-h-[100px] overflow-y-auto">
                                    {isLoadingSizes && (
                                        <p>Завантаження розмірів...</p>
                                    )}
                                    {allSizes?.map((size) => (
                                        <button
                                            key={size.id}
                                            type="button"
                                            onClick={() => handleAddSize(size)}
                                            className={`px-3 py-1 rounded-full text-sm
                              ${
                                  sizesToSend.some((s) => s.id === size.id)
                                      ? `bg-black text-white cursor-not-allowed`
                                      : `border border-gray-300 text-black bg-gray-50 hover:bg-gray-200 cursor-pointer`
                              }`}
                                        >
                                            {size.name}
                                        </button>
                                    ))}
                                    {allSizes?.length === 0 &&
                                        !isLoadingSizes && (
                                            <p>Розміри не знайдено.</p>
                                        )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">
                                    Обрані розміри:
                                </label>
                                <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded max-h-[100px] overflow-y-auto">
                                    {sizesToSend.length > 0 ? (
                                        sizesToSend.map((size) => (
                                            <div
                                                key={size.id}
                                                className="flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-sm cursor-pointer"
                                                onClick={() =>
                                                    handleRemoveSize(size.id)
                                                }
                                            >
                                                {size.name}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">
                                            Не обрано жодного розміру.
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">
                                    Оберіть типи:
                                </label>
                                <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded max-h-[100px] overflow-y-auto">
                                    {isLoadingTypes && (
                                        <p>Завантаження типів...</p>
                                    )}
                                    {allTypes?.map((type) => (
                                        <button
                                            key={type.id}
                                            type="button"
                                            onClick={() => handleAddType(type)}
                                            className={`px-3 py-1 rounded-full text-sm
                              ${
                                  typesToSend.some((t) => t.id === type.id)
                                      ? `bg-black text-white cursor-not-allowed`
                                      : `border border-gray-300 text-black bg-gray-50 hover:bg-gray-200 cursor-pointer`
                              }`}
                                        >
                                            {type.name}
                                        </button>
                                    ))}
                                    {allTypes?.length === 0 &&
                                        !isLoadingTypes && (
                                            <p>Типи не знайдено.</p>
                                        )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold">
                                    Обрані типи:
                                </label>
                                <div className="flex flex-wrap gap-2 p-2 border border-gray-200 rounded max-h-[100px] overflow-y-auto">
                                    {typesToSend.length > 0 ? (
                                        typesToSend.map((type) => (
                                            <div
                                                key={type.id}
                                                className="flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-sm cursor-pointer"
                                                onClick={() =>
                                                    handleRemoveType(type.id)
                                                }
                                            >
                                                {type.name}
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">
                                            Не обрано жодного типу.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-[20px]">
                            <div>
                                <label
                                    htmlFor="banner"
                                    className="text-sm font-semibold"
                                >
                                    Банер
                                </label>
                                <label
                                    htmlFor="banner"
                                    className="min-h-[100px] max-w-[300px] border border-dashed border-gray-400 mt-2 flex justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-md overflow-hidden"
                                >
                                    {bannerPreview ? (
                                        <Image
                                            src={
                                                bannerPreview.startsWith(
                                                    "blob:"
                                                ) ||
                                                bannerPreview.startsWith(
                                                    "data:"
                                                )
                                                    ? bannerPreview
                                                    : `http://localhost:5000${bannerPreview}`
                                            }
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
                            <div>
                                <label
                                    htmlFor="images"
                                    className="text-sm font-semibold"
                                >
                                    Додаткові зображення
                                </label>
                                <label
                                    htmlFor="images"
                                    className="min-h-[100px] max-w-[300px] border border-dashed border-gray-400 mt-2 flex products-center items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 rounded-md overflow-hidden"
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
                                            className="relative group w-[100px] h-[100px] group cursor-pointer"
                                            onClick={() => removeImage(i)}
                                        >
                                            <Image
                                                src={
                                                    src.startsWith("blob:") ||
                                                    src.startsWith("data:")
                                                        ? src
                                                        : `http://localhost:5000${src}`
                                                }
                                                alt={`img-${i}`}
                                                width={100}
                                                height={100}
                                                className="object-contain rounded-md"
                                            />
                                            <div className="absolute flex items-center justify-center opacity-0 rounded group-hover:opacity-100 top-0 right-0 bg-black/40 w-full h-full transition-all duration-200">
                                                <TrashIcon className=" w-[35px] fill-none  stroke-white stroke-[1.5] " />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {message && <p className="text-red-500 mt-4">{message}</p>}
                    <div className="flex justify-end gap-4 mt-[30px]">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                        >
                            Відмінити
                        </button>
                        <button
                            type="submit"
                            className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                        >
                            Зберегти
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
    return createPortal(modalContent, document.body);
}
