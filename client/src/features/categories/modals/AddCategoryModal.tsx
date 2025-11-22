"use client";

import { ICollection } from "@/features/collections/types/collections.types";
import { useEscapeKeyClose, useUploadBanner } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { UploadBannerWithPreview } from "@/shared/ui/components";
import { InputField } from "@/shared/ui/inputs/InputField";

import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { BasicSelector } from "@/shared/ui/selectors/BasicSelector";
import { BasicTextarea } from "@/shared/ui/textareas/BasicTextarea";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
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
    status: boolean;
}

export function AddCategoryModal({
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
            status: false,
        },
    });

    const [banner, setBanner] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [bannerError, setBannerError] = useState<string | null>(null);
    const [modalMessage, setModalMessage] = useState("");

    const uploadBannerMutation = useUploadBanner();
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
            setBannerError("Choose banner");
            return;
        } else {
            setBannerError(null);
        }

        try {
            if (collectionId) {
                const category = await createCategoryMutation.mutateAsync({
                    name: data.name.trim(),
                    path: data.path.trim(),
                    status: data.status,
                    collectionId,
                    description: data.description,
                });

                if (!category.data?.id) {
                    throw new Error("Unable to get category ID");
                }

                await uploadBannerMutation.mutateAsync({
                    type: "category",
                    entityId: category.data?.id,
                    banner,
                    includedIn: collectionId,
                });
            }
            handleClose();
        } catch (error: any) {
            setModalMessage(error?.message || "Error creating category");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Adding a category"}>
            <form
                className="flex flex-col gap-[10px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <InputField
                            label="Name*"
                            type="text"
                            placeholder="Category name"
                            {...register("name", {
                                required: "Enter category name",
                                minLength: {
                                    value: 2,
                                    message: "Minimum 2 characters",
                                },
                            })}
                            errorMessage={errors.name?.message}
                        />
                        <InputField
                            label="Path*"
                            type="text"
                            placeholder="Path"
                            {...register("path", {
                                required: "Enter path",
                                pattern: {
                                    value: /^[a-z0-9-]+$/,
                                    message:
                                        "Only lowercase English letters, numbers, and hyphens",
                                },
                            })}
                            errorMessage={errors.path?.message}
                        />
                        <BasicSelector
                            label={"Status*"}
                            register={{
                                ...register("status", {
                                    required: "Choose a status",
                                }),
                            }}
                            itemsList={[false, true]}
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
                    <MonoButtonUnderlined
                        type="button"
                        onClick={handleClose}
                        disabled={
                            uploadBannerMutation.isPending ||
                            createCategoryMutation.isPending
                        }
                    >
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={
                            uploadBannerMutation.isPending ||
                            createCategoryMutation.isPending
                        }
                    >
                        {uploadBannerMutation.isPending ||
                        createCategoryMutation.isPending
                            ? "Loading..."
                            : "Add"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
