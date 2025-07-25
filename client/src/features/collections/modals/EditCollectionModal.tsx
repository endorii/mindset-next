"use client";

import { deleteImage } from "@/shared/api/images.api";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useUploadImage } from "@/shared/hooks/useImages";
import { TStatus } from "@/shared/types/types";
import InputField from "@/shared/ui/inputs/InputField";
import { statuses } from "@/shared/utils/helpers";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useEditCollection } from "../hooks/useCollections";
import { ICollection } from "../types/collections.types";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface EditCollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    collection: ICollection;
}

type FormValues = {
    name: string;
    path: string;
    description: string;
    status: TStatus;
};

export default function EditCollectionModal({
    isOpen,
    onClose,
    collection,
}: EditCollectionModalProps) {
    const [banner, setBanner] = useState<string | File>("");
    const [preview, setPreview] = useState<string>("");

    const [modalMessage, setModalMessage] = useState("");

    const uploadImageMutation = useUploadImage();
    const editCollection = useEditCollection();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            name: "",
            path: "",
            description: "",
            status: "INACTIVE",
        },
    });

    useEffect(() => {
        if (collection) {
            reset({
                name: collection.name || "",
                path: collection.path || "",
                description: collection.description || "",
                status: collection.status || "INACTIVE",
            });
            setModalMessage("");
            setBanner(collection.banner || "");
            setPreview("");
        }
    }, [collection, reset]);

    const onSubmit = async (data: FormValues) => {
        try {
            let bannerPath = typeof banner === "string" ? banner : "";

            if (banner instanceof File) {
                if (
                    typeof collection.banner === "string" &&
                    collection.banner.startsWith("/images/")
                ) {
                    await deleteImage(collection.banner);
                }

                const uploadResult = await uploadImageMutation.mutateAsync(
                    banner
                );
                bannerPath = uploadResult.path;
            }

            await editCollection.mutateAsync({
                collectionPath: collection.path,
                data: {
                    ...data,
                    banner: bannerPath,
                },
            });

            handleClose();
            toast.success("Колекцію успішно відредаговано!");
        } catch (err: any) {
            setModalMessage(err?.message || "Помилка при редагуванні колекції");
        }
    };

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
        setModalMessage("");
        setBanner("");
        setPreview("");
        onClose();
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !collection) return null;

    const bannerSrc =
        typeof banner === "string" && banner.startsWith("/images/")
            ? `http://localhost:5000${banner}`
            : "";

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={`Редагування колекції`}>
            <form
                className="flex flex-col gap-[20px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InputField
                            label="Назва*"
                            type="text"
                            placeholder="Назва колекції"
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
                            })}
                            errorMessage={errors.path?.message}
                        />

                        <div className="flex flex-col gap-[7px]">
                            <label
                                htmlFor="status"
                                className="text-sm font-semibold"
                            >
                                Статус*
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
                                        className="text-white bg-black"
                                        key={statusOption}
                                        value={statusOption}
                                    >
                                        {statusOption}
                                    </option>
                                ))}
                            </select>
                            {errors.status && (
                                <p className="text-sm text-red-500">
                                    {errors.status.message}
                                </p>
                            )}
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
                            className="text-sm font-semibold"
                        >
                            Банер
                        </label>
                        <label
                            htmlFor="banner"
                            className="min-h-[100px] max-w-[300px] border border-dashed border-white/10 mt-2 flex items-center justify-center cursor-pointer hover:bg-white/3 rounded-md overflow-hidden"
                        >
                            {preview ? (
                                <Image
                                    src={preview}
                                    alt="preview"
                                    width={250}
                                    height={250}
                                    className="object-cover"
                                />
                            ) : bannerSrc ? (
                                <Image
                                    src={bannerSrc}
                                    alt="banner"
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
                    <MonoButton type="button" onClick={handleClose}>
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={
                            uploadImageMutation.isPending ||
                            editCollection.isPending
                        }
                    >
                        {uploadImageMutation.isPending ||
                        editCollection.isPending
                            ? "Завантаження..."
                            : "Підтвердити"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
