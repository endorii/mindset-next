"use client";

import { STATUSES } from "@/shared/constants/constants";
import { useEscapeKeyClose, useUploadBanner } from "@/shared/hooks";
import { MonoButton } from "@/shared/ui/buttons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { Label } from "@/shared/ui/components";
import { InputField } from "@/shared/ui/inputs/InputField";
import { BasicSelector } from "@/shared/ui/selectors/BasicSelector";
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
import { useEditCollection } from "../hooks/useCollections";
import { ICollection } from "../types/collections.types";

interface EditCategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    collection: ICollection;
}

interface CategoryFormData {
    name: string;
    path: string;
    description: string;
    status: boolean;
}

export function EditCollectionModal({
    isOpen,
    onClose,
    collection,
}: EditCategoryModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<CategoryFormData>({
        defaultValues: {
            name: "",
            path: "",
            description: "",
            status: false,
        },
    });

    const [banner, setBanner] = useState<string | File>("");
    const [preview, setPreview] = useState<string>("");
    const [modalMessage, setModalMessage] = useState("");

    const uploadBannerMutation = useUploadBanner();
    const editCollectionMutation = useEditCollection();

    useEffect(() => {
        if (collection) {
            reset({
                name: collection.name,
                path: collection.path,
                description: collection.description,
                status: collection.status,
            });
            setBanner(collection.banner || "");
            setModalMessage("");
            setPreview("");
        }
    }, [collection, reset]);

    const onSubmit = async (data: CategoryFormData) => {
        try {
            if (collection.id) {
                await editCollectionMutation.mutateAsync({
                    collectionId: collection.id,
                    data: {
                        name: data.name,
                        path: data.path,
                        status: data.status,
                    },
                });

                if (banner instanceof File) {
                    await uploadBannerMutation.mutateAsync({
                        type: "collection",
                        entityId: collection.id,
                        banner,
                        includedIn: null,
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

    if (!isOpen || !collection) return null;

    const bannerSrc = !preview && typeof banner === "string" ? banner : "";

    const displaySrc = preview || bannerSrc;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Editing a collection"}>
            <form
                className="flex flex-col gap-[10px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <InputField
                            label="Name*"
                            type="text"
                            placeholder="Collection name"
                            {...register("name", {
                                required: "Enter collection name",
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
                                pattern: {
                                    value: /^[a-z0-9]{3,}(-[a-z0-9]+)*$/,
                                    message:
                                        "Path must be at least 3 characters, only lowercase letters, numbers, and single hyphens between words",
                                },
                            })}
                            errorMessage={errors.path?.message}
                        />
                        <BasicSelector
                            label={"Status*"}
                            control={control}
                            itemsList={STATUSES}
                            basicOptionLabel="Choose a status"
                            getOptionLabel={(s) => s.label}
                            getOptionValue={(s) => String(s.value)}
                            errorMessage={errors.status?.message}
                            name={"status"}
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

                    <div className="flex flex-col gap-[3px] w-full">
                        <Label>Banner</Label>
                        <label
                            htmlFor="banner"
                            className={`group border min-h-[200px] border-dashed border-white/5 flex items-center justify-center cursor-pointer hover:bg-white/3 overflow-hidden group-hover:text-white transition-all duration-300`}
                        >
                            {displaySrc ? (
                                <Image
                                    src={displaySrc}
                                    alt="preview"
                                    width={400}
                                    height={400}
                                    className="max-h-[400px] object-contain"
                                />
                            ) : (
                                <span className="text-3xl font-light text-neutral-500 group-hover:text-white transition-all duration-300">
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
                    <MonoButtonUnderlined onClick={onClose} type="button">
                        Cancel
                    </MonoButtonUnderlined>
                    <MonoButton
                        type="submit"
                        disabled={
                            uploadBannerMutation.isPending ||
                            editCollectionMutation.isPending
                        }
                    >
                        {uploadBannerMutation.isPending ||
                        editCollectionMutation.isPending
                            ? "Loading..."
                            : "Confirm"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
