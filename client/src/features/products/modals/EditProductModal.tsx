"use client";

import { useColors } from "@/features/admin/attributes/product-colors/hooks/useColors";
import { useSizes } from "@/features/admin/attributes/product-sizes/hooks/useSizes";
import { useTypes } from "@/features/admin/attributes/product-types/hooks/useTypes";
import {
    useEscapeKeyClose,
    useUploadBanner,
    useUploadImages,
} from "@/shared/hooks";
import { TrashIcon } from "@/shared/icons";
import { TAvailble, TStatus } from "@/shared/types/types";
import { MonoButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import {
    Label,
    RenderAttributeField,
    UploadBannerWithPreview,
} from "@/shared/ui/components";
import { InputField } from "@/shared/ui/inputs/InputField";
import { BasicSelector } from "@/shared/ui/selectors/BasicSelector";
import { BasicTextarea } from "@/shared/ui/textareas/BasicTextarea";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { availables, statuses } from "@/shared/utils/helpers";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useEditProduct } from "../hooks/useProducts";
import { IProduct } from "../types/products.types";

interface EditProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: IProduct;
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

export function EditProductModal({
    isOpen,
    onClose,
    product,
}: EditProductModalProps) {
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
            available: "Not available",
            description: "",
            composition: "",
            status: "Not active",
            colorIds: [],
            sizeIds: [],
            typeIds: [],
        },
    });

    const [banner, setBanner] = useState<File | string | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [images, setImages] = useState<(File | string)[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);

    const [colorsToSend, setColorsToSend] = useState<string[]>([]);
    const [sizesToSend, setSizesToSend] = useState<string[]>([]);
    const [typesToSend, setTypesToSend] = useState<string[]>([]);

    const [bannerError, setBannerError] = useState<string | null>(null);
    const [modalMessage, setModalMessage] = useState("");

    const uploadBannerMutation = useUploadBanner();
    const uploadImagesMutation = useUploadImages();
    const editProductMutation = useEditProduct();

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

    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                path: product.path,
                price: product.price,
                oldPrice: product.oldPrice,
                available: product.available,
                description: product.description,
                composition: product.composition,
                status: product.status,
                colorIds: product.productColors.map((pc) => pc.color.id),
                sizeIds: product.productSizes.map((ps) => ps.size.id),
                typeIds: product.productTypes.map((pt) => pt.type.id),
            });

            setModalMessage("");
            setColorsToSend(product.productColors.map((pc) => pc.color.id));
            setSizesToSend(product.productSizes.map((ps) => ps.size.id));
            setTypesToSend(product.productTypes.map((pt) => pt.type.id));

            setBanner(product.banner);
            setPreview(getFullImageUrl(product.banner));

            setImages(product.images);
            setImagesPreview(product.images.map((img) => getFullImageUrl(img)));
        }
    }, [product, reset]);

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !product) return null;

    function getFullImageUrl(src: string | null | undefined) {
        if (!src) return "";
        if (src.startsWith("blob:") || src.startsWith("data:")) {
            return src;
        }
        return src;
    }

    const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setBanner(file);
            setPreview(URL.createObjectURL(file));
            setBannerError(null);
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
        try {
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
            } else {
                setBannerError(null);
            }

            if (hasError) return;

            if (banner instanceof File) {
                await uploadBannerMutation.mutateAsync({
                    type: "product",
                    entityId: product.id,
                    banner,
                    includedIn: product.categoryId,
                });
            }

            const imagesToUpload: File[] = [];
            const existingImagePaths: string[] = [];

            images.forEach((img) => {
                if (typeof img === "string") {
                    existingImagePaths.push(img);
                } else {
                    imagesToUpload.push(img);
                }
            });

            const uploadImagesResult = imagesToUpload.length
                ? await uploadImagesMutation.mutateAsync({
                      type: "products",
                      entityId: product.id,
                      images: imagesToUpload,
                  })
                : { paths: [] };

            const allImagePaths = [
                ...existingImagePaths,
                ...uploadImagesResult.paths,
            ];

            await editProductMutation.mutateAsync({
                productId: product.id,
                productData: {
                    name: data.name.trim(),
                    path: data.path.trim(),
                    price: Number(data.price),
                    oldPrice: Number(data.oldPrice),
                    available: data.available,
                    description: data.description.trim(),
                    composition: data.composition.trim(),
                    status: data.status,
                    images: allImagePaths,
                    colorIds: colorsToSend,
                    sizeIds: sizesToSend,
                    typeIds: typesToSend,
                },
            });

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
            setModalMessage(err?.message || "Unable to edit product");
        }
    };

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Product editing"}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[10px]"
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <InputField
                            label="Name*"
                            id="editProductName"
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
                            id="editProductPath"
                            placeholder="Path"
                            type="text"
                            {...register("path", {
                                required: "Enter path",
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters",
                                },
                            })}
                            errorMessage={errors.path?.message}
                        />
                        <InputField
                            label="Price*"
                            id="editProductPrice"
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
                            label="Old price*"
                            id="editProductOldPrice"
                            placeholder="Old price"
                            type="number"
                            {...register("oldPrice", {
                                required: "Enter old price",
                                valueAsNumber: true,
                                min: {
                                    value: 1,
                                    message: "Price must be at least 1",
                                },
                            })}
                            errorMessage={errors.oldPrice?.message}
                        />

                        <BasicSelector
                            label={"Accessibility*"}
                            register={{
                                ...register("available", {
                                    required: "Choose availability",
                                }),
                            }}
                            itemsList={availables}
                            basicOptionLabel="Choose availability"
                            getOptionLabel={(available) => available}
                            getOptionValue={(available) => available}
                            errorMessage={errors.available?.message}
                        />
                        <BasicSelector
                            label={"Status*"}
                            register={{
                                ...register("status", {
                                    required: "Choose a status",
                                }),
                            }}
                            itemsList={statuses}
                            basicOptionLabel="Choose a status"
                            getOptionLabel={(status) => status}
                            getOptionValue={(status) => status}
                            errorMessage={errors.status?.message}
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
                            className={`group border min-h-[200px] border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/3 overflow-hidden group-hover:text-white transition-all duration-300`}
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
                            editProductMutation.isPending
                        }
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={
                            uploadBannerMutation.isPending ||
                            uploadImagesMutation.isPending ||
                            editProductMutation.isPending
                        }
                    >
                        {uploadBannerMutation.isPending ||
                        uploadImagesMutation.isPending ||
                        editProductMutation.isPending
                            ? "Loading..."
                            : "Save"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
