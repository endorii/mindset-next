"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

import { ICollection } from "@/features/collections/types/collections.types";
import { ICategory } from "../types/categories.types";
import { useEditCategory } from "../hooks/useCategories";
import { useUploadImage } from "@/shared/hooks/useImages";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { TStatus } from "@/shared/types/types";
import { statuses } from "@/shared/utils/helpers";

import InputField from "@/shared/ui/inputs/InputField";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionPath: ICollection["path"];
    category: ICategory;
}

interface CategoryFormData {
    name: string;
    path: string;
    status: TStatus;
}

export default function EditCategoryModal({
    isOpen,
    onClose,
    collectionPath,
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
            status: "INACTIVE",
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
                status: category.status,
            });
            setBanner(category.banner || "");
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

            await editCategoryMutation.mutateAsync({
                collectionPath,
                categoryPath: category.path,
                data: {
                    ...data,
                    banner: bannerPath,
                },
            });

            onClose();
        } catch (error: any) {
            console.error("Помилка при редагуванні категорії:", error);
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
                className="flex flex-col gap-[20px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InputField
                            label="Назва"
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
                            label="Шлях"
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
                        <div className="flex flex-col gap-[7px]">
                            <label
                                htmlFor="status"
                                className="font-semibold text-sm"
                            >
                                Статус
                            </label>
                            <select
                                {...register("status", {
                                    required: "Оберіть статус",
                                })}
                                className="border border-white/10 rounded px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer"
                            >
                                <option value="" disabled>
                                    Оберіть статус
                                </option>
                                {statuses.map((statusOption) => (
                                    <option
                                        key={statusOption}
                                        value={statusOption}
                                    >
                                        {statusOption}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[7px] w-full">
                        <label htmlFor="banner" className="font-semibold">
                            Банер
                        </label>
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
