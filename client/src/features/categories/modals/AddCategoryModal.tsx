"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { ICollection } from "@/features/collections/types/collections.types";
import { useUploadImage } from "@/shared/hooks/useImages";
import { useCreateCategory } from "../hooks/useCategories";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { TStatus } from "@/shared/types/types";
import InputField from "@/shared/ui/inputs/InputField";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import { statuses } from "@/shared/utils/helpers";
import { toast } from "sonner";

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionId: ICollection["id"];
    collectionPath: ICollection["path"];
}

interface CategoryFormData {
    name: string;
    path: string;
    description: string;
    status: TStatus;
}

export default function AddCategoryModal({
    isOpen,
    onClose,
    collectionId,
    collectionPath,
}: AddCategoryModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryFormData>({
        defaultValues: {
            status: "INACTIVE",
        },
    });

    const [banner, setBanner] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [modalMessage, setModalMessage] = useState("");

    const uploadImageMutation = useUploadImage();
    const createCategoryMutation = useCreateCategory();

    const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setBanner(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        }
    };

    const handleClose = () => {
        if (preview) URL.revokeObjectURL(preview);
        reset();
        setBanner(null);
        setPreview(null);
        setModalMessage("");
        onClose();
    };

    const onSubmit = async (data: CategoryFormData) => {
        if (!banner) {
            setModalMessage("Оберіть зображення банера");
            return;
        }

        try {
            const uploadResult = await uploadImageMutation.mutateAsync(banner);
            const imagePath = uploadResult.path;

            await createCategoryMutation.mutateAsync({
                collectionPath,
                categoryData: {
                    name: data.name.trim(),
                    path: data.path.trim(),
                    banner: imagePath,
                    views: 0,
                    status: data.status,
                    collectionId,
                    description: data.description,
                },
            });

            handleClose();
            toast.success("Категорію упішно додано!");
        } catch (error: any) {
            setModalMessage(
                error?.message || "Помилка при створенні категорії"
            );
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Додавання категорії"}>
            <form
                className="flex flex-col gap-[20px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InputField
                            label="Назва*"
                            type="text"
                            placeholder="Назва категорії"
                            {...register("name", {
                                required: "Введіть назву",
                                minLength: {
                                    value: 2,
                                    message: "Мінімум 2 символи",
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
                                pattern: {
                                    value: /^[a-z0-9-]+$/,
                                    message:
                                        "Лише маленькі англійські літери, цифри та дефіс",
                                },
                            })}
                            errorMessage={errors.path?.message}
                        />
                        <div className="flex flex-col gap-[7px]">
                            <label
                                htmlFor="status"
                                className="font-semibold text-sm"
                            >
                                Статус*
                            </label>
                            <select
                                {...register("status", {
                                    required: "Оберіть статус",
                                })}
                                className="border border-white/10 rounded p-[10px] outline-0 cursor-pointer"
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
                    <div className="flex flex-col gap-[7px]">
                        <label className="font-semibold text-sm">Опис*</label>
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
                    <div className="flex flex-col gap-[7px] w-full">
                        <label
                            htmlFor="banner"
                            className="text-sm font-semibold cursor-pointer"
                        >
                            Банер
                        </label>
                        <label
                            htmlFor="banner"
                            className="min-h-[100px] max-w-[300px] border border-dashed border-white/20 mt-2 flex items-center justify-center cursor-pointer bg-black/10 hover:bg-black/20 rounded-xl overflow-hidden"
                        >
                            {preview ? (
                                <Image
                                    src={preview}
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
                </FormFillingWrapper>

                {modalMessage && (
                    <p className="text-red-500 text-sm">{modalMessage}</p>
                )}

                <FormButtonsWrapper>
                    <MonoButton
                        type="button"
                        onClick={handleClose}
                        disabled={
                            uploadImageMutation.isPending ||
                            createCategoryMutation.isPending
                        }
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={
                            uploadImageMutation.isPending ||
                            createCategoryMutation.isPending
                        }
                    >
                        {uploadImageMutation.isPending ||
                        createCategoryMutation.isPending
                            ? "Завантаження..."
                            : "Додати"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
