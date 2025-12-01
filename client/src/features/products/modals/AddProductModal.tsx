"use client";

import { useColors } from "@/features/admin/attributes/product-colors/hooks/useColors";
import { useSizes } from "@/features/admin/attributes/product-sizes/hooks/useSizes";
import { useTypes } from "@/features/admin/attributes/product-types/hooks/useTypes";
import { AVAILABILITIES, STATUSES } from "@/shared/constants/constants";
import {
    useEscapeKeyClose,
    useUploadBanner,
    useUploadImages,
} from "@/shared/hooks";
import { TrashIcon } from "@/shared/icons";
import { MonoButton, MonoButtonUnderlined } from "@/shared/ui/buttons";
import {
    Label,
    RenderAttributeField,
    UploadBannerWithPreview,
} from "@/shared/ui/components";
import { InputField } from "@/shared/ui/inputs";
import { BasicSelector } from "@/shared/ui/selectors";
import { BasicTextarea } from "@/shared/ui/textareas/BasicTextarea";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useCreateProduct } from "../hooks/useProducts";

interface AddProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryId: string | undefined;
}

interface FormData {
    name: string;
    path: string;
    price: number;
    oldPrice: number | null;
    isAvailable: boolean;
    description: string;
    composition: string;
    isVisible: boolean;
    colorIds?: string[];
    sizeIds?: string[];
    typeIds?: string[];
}

export function AddProductModal({
    isOpen,
    onClose,
    categoryId,
}: AddProductModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            name: "",
            path: "",
            price: 0,
            oldPrice: null,
            isAvailable: false,
            description: "",
            composition: "",
            isVisible: false,
            colorIds: [],
            sizeIds: [],
            typeIds: [],
        },
    });

    const [banner, setBanner] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [images, setImages] = useState<File[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);

    const [colorsToSend, setColorsToSend] = useState<string[]>([]);
    const [sizesToSend, setSizesToSend] = useState<string[]>([]);
    const [typesToSend, setTypesToSend] = useState<string[]>([]);

    const [bannerError, setBannerError] = useState<string | null>(null);
    const [modalMessage, setModalMessage] = useState("");

    const uploadBannerMutation = useUploadBanner();
    const uploadImagesMutation = useUploadImages();
    const createProductMutation = useCreateProduct();

    const { data: allColors } = useColors();
    const { data: allSizes } = useSizes();
    const { data: allTypes } = useTypes();

    useEffect(() => {
        if (colorsToSend.length > 0) {
            clearErrors("colorIds");
        }
    }, [colorsToSend, clearErrors]);

    useEffect(() => {
        if (sizesToSend.length > 0) {
            clearErrors("sizeIds");
        }
    }, [sizesToSend, clearErrors]);

    useEffect(() => {
        if (typesToSend.length > 0) {
            clearErrors("typeIds");
        }
    }, [typesToSend, clearErrors]);

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBanner(file);
            setPreview(URL.createObjectURL(file));
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

    const onSubmit = async (data: FormData) => {
        let hasError = false;

        if (colorsToSend.length === 0) {
            setError("colorIds", {
                type: "manual",
                message: "Choose at least one color",
            });
            hasError = true;
        } else clearErrors("colorIds");

        if (sizesToSend.length === 0) {
            setError("sizeIds", {
                type: "manual",
                message: "Choose at least one size",
            });
            hasError = true;
        } else clearErrors("sizeIds");

        if (typesToSend.length === 0) {
            setError("typeIds", {
                type: "manual",
                message: "Choose at least one type",
            });
            hasError = true;
        } else clearErrors("typeIds");

        if (!banner) {
            setBannerError("Choose banner");
            hasError = true;
            return;
        } else {
            hasError = false;
            setBannerError(null);
        }

        if (hasError) return;
        try {
            if (categoryId) {
                const product = await createProductMutation.mutateAsync({
                    name: data.name.trim(),
                    path: data.path.trim(),
                    price: Number(data.price),
                    oldPrice: data.oldPrice,
                    isAvailable: data.isAvailable,
                    description: data.description.trim(),
                    composition: data.composition.trim(),
                    isVisible: data.isVisible,
                    categoryId,
                    colorIds: colorsToSend,
                    sizeIds: sizesToSend,
                    typeIds: typesToSend,
                });

                if (!product.data?.id) {
                    throw new Error("Failed to get category ID");
                }

                await uploadBannerMutation.mutateAsync({
                    type: "product",
                    entityId: product.data?.id,
                    banner,
                    includedIn: categoryId,
                });

                images.length
                    ? await uploadImagesMutation.mutateAsync({
                          type: "products",
                          entityId: product.data.id,
                          images,
                          includedIn: product.data.categoryId,
                      })
                    : { paths: [] };
            }

            setBanner(null);
            setPreview(null);
            setImages([]);
            setImagesPreview([]);
            setColorsToSend([]);
            setSizesToSend([]);
            setTypesToSend([]);
            reset();
            setModalMessage("");
            onClose();
        } catch (err: any) {
            setModalMessage(err?.message || "Failed to add product");
        }
    };

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Adding a product"}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[10px]"
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <InputField
                            label="Name*"
                            id="addProductName"
                            placeholder="Product name"
                            type="text"
                            {...register("name", {
                                required: "Enter product name",
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters",
                                },
                            })}
                            errorMessage={errors.name?.message}
                        />
                        <InputField
                            label="Path*"
                            id="addProductPath"
                            placeholder="Path"
                            type="text"
                            {...register("path", {
                                required: "Enter path",
                                pattern: {
                                    value: /^[a-z0-9]{3,}(-[a-z0-9]+)*$/,
                                    message:
                                        "Path must be at least 3 characters, only lowercase letters, numbers, and single hyphens between words",
                                },
                            })}
                            errorMessage={errors.path?.message}
                        />
                        <InputField
                            label="Price*"
                            id="addProductPrice"
                            placeholder="Price"
                            type="number"
                            {...register("price", {
                                required: "Enter price",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Price must be at least 1",
                                },
                            })}
                            errorMessage={errors.price?.message}
                        />
                        <InputField
                            label="Old price"
                            id="addProductOldPrice"
                            placeholder="Old price (optional)"
                            type="text"
                            {...register("oldPrice", {
                                setValueAs: (v) => {
                                    if (v === "" || v == null) return null;

                                    if (isNaN(Number(v))) return v;

                                    return Number(v);
                                },
                                validate: (value) => {
                                    if (value === null) return true;

                                    if (isNaN(Number(value)))
                                        return "Please enter a valid number";

                                    if (Number(value) < 1)
                                        return "Price must be at least 1";

                                    return true;
                                },
                            })}
                            errorMessage={errors.oldPrice?.message}
                        />

                        <BasicSelector
                            label={"Availability*"}
                            control={control}
                            itemsList={AVAILABILITIES}
                            basicOptionLabel="Choose availability"
                            getOptionLabel={(a) => a.label}
                            getOptionValue={(a) => String(a.value)}
                            errorMessage={errors.isAvailable?.message}
                            name="isAvailable"
                        />

                        <BasicSelector
                            label={"Visibility*"}
                            control={control}
                            itemsList={STATUSES}
                            basicOptionLabel="Choose visibility"
                            getOptionLabel={(s) => s.label}
                            getOptionValue={(s) => String(s.value)}
                            errorMessage={errors.isVisible?.message}
                            name={"isVisible"}
                        />
                    </div>
                    <BasicTextarea
                        label="Description*"
                        register={{
                            ...register("description", {
                                required: "Enter a description",
                            }),
                        }}
                        errorMessage={errors.description?.message}
                    />
                    <BasicTextarea
                        label="Composition*"
                        register={{
                            ...register("composition", {
                                required: "Enter the product composition",
                            }),
                        }}
                        errorMessage={errors.composition?.message}
                    />
                    <RenderAttributeField
                        label={"Colors"}
                        allItems={allColors}
                        selected={colorsToSend}
                        setSelected={setColorsToSend}
                        errorMessage={errors.colorIds?.message}
                    />
                    <RenderAttributeField
                        label={"Sizes"}
                        allItems={allSizes}
                        selected={sizesToSend}
                        setSelected={setSizesToSend}
                        errorMessage={errors.sizeIds?.message}
                    />
                    <RenderAttributeField
                        label={"Types"}
                        allItems={allTypes}
                        selected={typesToSend}
                        setSelected={setTypesToSend}
                        errorMessage={errors.typeIds?.message}
                    />

                    <UploadBannerWithPreview
                        image={preview}
                        handleBannerChange={handleBannerChange}
                        bannerError={bannerError}
                    />
                    <div className="flex flex-col gap-[3px] w-full">
                        <Label>Additional images</Label>
                        <label
                            htmlFor="images"
                            className={`group border min-h-[200px] border-dashed border-white/5 flex items-center justify-center cursor-pointer hover:bg-white/3 overflow-hidden group-hover:text-white transition-all duration-300`}
                        >
                            <span className="text-3xl font-light text-neutral-500 group-hover:text-white transition-all duration-300">
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

                        <div className="flex flex-wrap gap-[15px] mt-4 max-w-[700px]">
                            {imagesPreview.map((src, i) => (
                                <div
                                    key={i}
                                    className="relative group max-h-[150px] group cursor-pointer"
                                    onClick={() => removeImage(i)}
                                >
                                    <Image
                                        src={src}
                                        alt={`img-${i}`}
                                        width={150}
                                        height={150}
                                        className="max-h-[150px] object-contain"
                                    />
                                    <div className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 top-0 right-0 bg-black/50 backdrop-blur-lg w-full h-full transition-all duration-200">
                                        <TrashIcon className="w-[40px] fill-none  stroke-white stroke-[1.2] " />
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
                    <MonoButtonUnderlined
                        type="button"
                        onClick={() => {
                            setBanner(null);
                            setPreview(null);
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
                            uploadBannerMutation.isPending ||
                            uploadImagesMutation.isPending ||
                            createProductMutation.isPending
                        }
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={
                            uploadBannerMutation.isPending ||
                            uploadImagesMutation.isPending ||
                            createProductMutation.isPending
                        }
                    >
                        {uploadBannerMutation.isPending ||
                        uploadImagesMutation.isPending ||
                        createProductMutation.isPending
                            ? "Loading..."
                            : "Add"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
