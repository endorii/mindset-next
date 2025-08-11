"use client";

import { ICollection } from "@/features/collections/types/collections.types";
import { useUploadImage, useEscapeKeyClose } from "@/shared/hooks";
import { TStatus } from "@/shared/types/types";
import { MonoButton } from "@/shared/ui/buttons";
import InputField from "@/shared/ui/inputs/InputField";
import BasicSelector from "@/shared/ui/selectors/BasicSelector";
import BasicTextarea from "@/shared/ui/textareas/BasicTextarea";
import {
    ModalWrapper,
    FormFillingWrapper,
    FormButtonsWrapper,
} from "@/shared/ui/wrappers";
import { statuses } from "@/shared/utils/helpers";
import { useState, useEffect, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { Label } from "recharts";
import { useEditCategory } from "../hooks/useCategories";
import { ICategory } from "../types/categories.types";
import Image from "next/image";

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    category: ICategory;
}

interface CategoryFormData {
    name: string;
    path: string;
    description: string;
    status: TStatus;
}

export default function EditCategoryModal({
    isOpen,
    onClose,
    category,
}: EditCategoryModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryFormData>({
        defaultValues: {
            name: "",
            path: "",
            description: "",
            status: "Не активно",
        },
    });

    const [banner, setBanner] = useState<string | File>("");
    const [preview, setPreview] = useState<string>("");
    const [modalMessage, setModalMessage] = useState("");

    const uploadImageMutation = useUploadImage();
    const editCategoryMutation = useEditCategory();

    useEffect(() => {
        if (category) {
            reset({
                name: category.name,
                path: category.path,
                description: category.description,
                status: category.status,
            });
            setBanner(category.banner || "");
            setModalMessage("");
            setPreview("");
        }
    }, [category, reset]);

    const onSubmit = async (data: CategoryFormData) => {
        try {
            let bannerPath = typeof banner === "string" ? banner : "";

            if (banner instanceof File) {
                const uploadResult = await uploadImageMutation.mutateAsync(
                    banner
                );
                bannerPath = uploadResult.path;
            }

            if (category.id) {
                await editCategoryMutation.mutateAsync({
                    categoryId: category.id,
                    data: {
                        ...data,
                        banner: bannerPath,
                    },
                });
            }

            onClose();
        } catch (error: any) {
            setModalMessage(error?.message || "Помилка при редагуванні");
        }
    };

    const handleBannerChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setBanner(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !category) return null;

    const bannerSrc =
        !preview && typeof banner === "string" && banner.startsWith("/images/")
            ? `http://localhost:5000${banner}`
            : "";

    const displaySrc = preview || bannerSrc;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Редагування категорії"}>
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <InputField
                            label="Назва*"
                            type="text"
                            placeholder="Назва категорії"
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
                            type="text"
                            placeholder="Шлях"
                            {...register("path", {
                                required: "Введіть шлях",
                                minLength: {
                                    value: 3,
                                    message: "Мінімум 3 символи",
                                },
                                pattern: {
                                    value: /^[a-z0-9-]+$/,
                                    message:
                                        "Допустимі лише малі латинські літери, цифри та дефіс",
                                },
                            })}
                            errorMessage={errors.path?.message}
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
                    <div className="flex flex-col gap-[7px] w-full">
                        <Label>Банер</Label>
                        <label
                            htmlFor="banner"
                            className="min-h-[100px] max-w-[300px] border border-dashed border-white/10 mt-2 flex items-center justify-center cursor-pointer bg-black/20 hover:bg-white/10 rounded-md overflow-hidden"
                        >
                            {displaySrc ? (
                                <Image
                                    src={displaySrc}
                                    alt="preview"
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
                </FormFillingWrapper>

                {modalMessage && (
                    <p className="text-red-500 text-sm">{modalMessage}</p>
                )}

                <FormButtonsWrapper>
                    <MonoButton onClick={onClose} type="button">
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={
                            uploadImageMutation.isPending ||
                            editCategoryMutation.isPending
                        }
                    >
                        {uploadImageMutation.isPending ||
                        editCategoryMutation.isPending
                            ? "Завантаження..."
                            : "Підтвердити"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
