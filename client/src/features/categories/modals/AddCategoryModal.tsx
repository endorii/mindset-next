"use client";

import { ICollection } from "@/features/collections/types/collections.types";
import { useUploadImage, useEscapeKeyClose } from "@/shared/hooks";
import { TStatus } from "@/shared/types/types";
import { MonoButton } from "@/shared/ui/buttons";
import { UploadBannerWithPreview } from "@/shared/ui/components";
import InputField from "@/shared/ui/inputs/InputField";
import BasicSelector from "@/shared/ui/selectors/BasicSelector";
import BasicTextarea from "@/shared/ui/textareas/BasicTextarea";
import {
    ModalWrapper,
    FormFillingWrapper,
    FormButtonsWrapper,
} from "@/shared/ui/wrappers";
import { statuses } from "@/shared/utils/helpers";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useCreateCategory } from "../hooks/useCategories";

interface AddCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    collectionId: ICollection["id"];
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
}: AddCategoryModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CategoryFormData>({
        defaultValues: {
            status: "Не активно",
        },
    });

    const [banner, setBanner] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [bannerError, setBannerError] = useState<string | null>(null);
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
            setBannerError("Оберіть банер");
            return;
        } else {
            setBannerError(null);
        }

        try {
            const uploadResult = await uploadImageMutation.mutateAsync(banner);
            const imagePath = uploadResult.path;

            if (collectionId) {
                await createCategoryMutation.mutateAsync({
                    name: data.name.trim(),
                    path: data.path.trim(),
                    banner: imagePath,
                    views: 0,
                    status: data.status,
                    collectionId,
                    description: data.description,
                });
            }
            handleClose();
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

                    <UploadBannerWithPreview
                        image={preview}
                        handleBannerChange={handleBannerChange}
                        bannerError={bannerError}
                    />
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
