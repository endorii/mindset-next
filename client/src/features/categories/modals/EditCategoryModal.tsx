"use client";

import { useEscapeKeyClose, useUploadBanner } from "@/shared/hooks";
import { TStatus } from "@/shared/types/types";
import { MonoButton } from "@/shared/ui/buttons";
import { InputField } from "@/shared/ui/inputs/InputField";
import { BasicSelector } from "@/shared/ui/selectors/BasicSelector";
import { BasicTextarea } from "@/shared/ui/textareas/BasicTextarea";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { statuses } from "@/shared/utils/helpers";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { Label } from "recharts";
import { useEditCategory } from "../hooks/useCategories";
import { ICategory } from "../types/categories.types";

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

export function EditCategoryModal({
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
            status: "Not active",
        },
    });

    const [banner, setBanner] = useState<string | File>("");
    const [preview, setPreview] = useState<string>("");
    const [modalMessage, setModalMessage] = useState("");

    const uploadBannerMutation = useUploadBanner();
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
            if (category.id) {
                await editCategoryMutation.mutateAsync({
                    categoryId: category.id,
                    data: {
                        ...data,
                    },
                });

                if (banner instanceof File) {
                    await uploadBannerMutation.mutateAsync({
                        type: "category",
                        entityId: category.id,
                        banner,
                        includedIn: category.collectionId,
                    });
                }
            }

            onClose();
        } catch (error: any) {
            setModalMessage(error?.message || "Error while editing");
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

    const bannerSrc = !preview && typeof banner === "string" ? banner : "";

    const displaySrc = preview || bannerSrc;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Editing a category"}>
            <form
                className="flex flex-col gap-[15px]"
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
                                    value: 3,
                                    message: "Minimum 3 characters",
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
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters",
                                },
                                pattern: {
                                    value: /^[a-z0-9-]+$/,
                                    message:
                                        "Only lowercase Latin letters, numbers, and hyphens are allowed.",
                                },
                            })}
                            errorMessage={errors.path?.message}
                        />

                        <BasicSelector<string>
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
                    <div className="flex flex-col gap-[7px] w-full">
                        <Label>Banner</Label>
                        <label
                            htmlFor="banner"
                            className="min-h-[100px] max-w-[300px] border border-dashed border-white/10 mt-2 flex items-center justify-center cursor-pointer bg-black/20 hover:bg-white/10 overflow-hidden"
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
                                <span className="text-4xl text-white/60">
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
                        Cancel
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={
                            uploadBannerMutation.isPending ||
                            editCategoryMutation.isPending
                        }
                    >
                        {uploadBannerMutation.isPending ||
                        editCategoryMutation.isPending
                            ? "Loading..."
                            : "Confirm"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
