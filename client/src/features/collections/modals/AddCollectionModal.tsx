"use client";

import { useEscapeKeyClose, useUploadBanner } from "@/shared/hooks";
import { TStatus } from "@/shared/types/types";
import { MonoButton } from "@/shared/ui/buttons";
import { UploadBannerWithPreview } from "@/shared/ui/components";
import { InputField } from "@/shared/ui/inputs/InputField";
import { BasicSelector } from "@/shared/ui/selectors/BasicSelector";
import { BasicTextarea } from "@/shared/ui/textareas/BasicTextarea";
import {
    FormButtonsWrapper,
    FormFillingWrapper,
    ModalWrapper,
} from "@/shared/ui/wrappers";
import { statuses } from "@/shared/utils/helpers";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { useCreateCollection } from "../hooks/useCollections";

interface AddCollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type FormValues = {
    name: string;
    path: string;
    description: string;
    status: TStatus;
};

export function AddCollectionModal({
    isOpen,
    onClose,
}: AddCollectionModalProps) {
    const [banner, setBanner] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [modalMessage, setModalMessage] = useState("");
    const [bannerError, setBannerError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            status: "Not active",
        },
    });

    const uploadBannerMutation = useUploadBanner();
    const createCollectionMutation = useCreateCollection();

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

    const onSubmit = async (data: FormValues) => {
        try {
            if (!banner) {
                setBannerError("Choose banner");
                return;
            } else {
                setBannerError(null);
            }

            const collection = await createCollectionMutation.mutateAsync({
                name: data.name,
                path: data.path,
                description: data.description,
                views: 0,
                status: data.status,
            });

            if (!collection.data?.id) {
                throw new Error("Failed to get collection ID");
            }

            await uploadBannerMutation.mutateAsync({
                type: "collection",
                entityId: collection.data?.id,
                banner,
                includedIn: null,
            });

            handleClose();
        } catch (err: any) {
            setModalMessage(err?.message || "Error creating collection");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Adding a collection"}>
            <form
                className="flex flex-col gap-[15px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-3 gap-[15px]">
                        <InputField
                            label={"Name*"}
                            type={"text"}
                            placeholder={"Collection name"}
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
                            label={"Path*"}
                            type={"text"}
                            placeholder={"Path"}
                            {...register("path", {
                                required: "Enter path",
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters",
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
                            uploadBannerMutation.isPending ||
                            createCollectionMutation.isPending
                        }
                    >
                        Cancel
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={
                            uploadBannerMutation.isPending ||
                            createCollectionMutation.isPending
                        }
                    >
                        {uploadBannerMutation.isPending ||
                        createCollectionMutation.isPending
                            ? "Loading..."
                            : "Add"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
