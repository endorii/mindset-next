"use client";

import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useUploadImage } from "@/shared/hooks/useImages";
import { TStatus } from "@/shared/types/types";
import InputField from "@/shared/ui/inputs/InputField";
import { statuses } from "@/shared/utils/helpers";
import { useState } from "react";
import { createPortal } from "react-dom";
import { useCreateCollection } from "../hooks/useCollections";
import Image from "next/image";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import { useForm } from "react-hook-form";
import { ICollection } from "../types/collections.types";
import { toast } from "sonner";

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

export default function AddCollectionModal({
    isOpen,
    onClose,
}: AddCollectionModalProps) {
    const [banner, setBanner] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [modalMessage, setModalMessage] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            status: "INACTIVE",
        },
    });

    const uploadImageMutation = useUploadImage();
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
                setModalMessage("Будь ласка, оберіть банер");
                return;
            }

            const uploadResult = await uploadImageMutation.mutateAsync(banner);
            const imagePath = uploadResult.path;

            await createCollectionMutation.mutateAsync({
                name: data.name,
                path: data.path,
                description: data.description,
                banner: imagePath,
                views: 0,
                status: data.status,
            });

            handleClose();
            toast.success("Коллекцію упішно додано!");
        } catch (err: any) {
            setModalMessage(err?.message || "Помилка при створенні колекції");
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Додавання колекції"}>
            <form
                className="flex flex-col gap-[20px]"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormFillingWrapper>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InputField
                            label={"Назва"}
                            type={"text"}
                            placeholder={"Назва колекції"}
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
                            label={"Шлях"}
                            type={"text"}
                            placeholder={"Шлях"}
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
                                className="text-sm font-semibold"
                                htmlFor="status"
                            >
                                Опис
                            </label>
                            <textarea
                                placeholder={"Опис"}
                                {...register("description", {
                                    required: "Введіть опис",
                                    minLength: {
                                        value: 3,
                                        message: "Мінімум 3 символи",
                                    },
                                })}
                            ></textarea>
                            {errors.description && (
                                <p className="text-sm text-red-500">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-col gap-[7px]">
                            <label
                                className="text-sm font-semibold"
                                htmlFor="status"
                            >
                                Статус
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
                            {errors.status && (
                                <p className="text-sm text-red-500">
                                    {errors.status.message}
                                </p>
                            )}
                        </div>
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
                    <MonoButton
                        type="button"
                        onClick={handleClose}
                        disabled={
                            uploadImageMutation.isPending ||
                            createCollectionMutation.isPending
                        }
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={
                            uploadImageMutation.isPending ||
                            createCollectionMutation.isPending
                        }
                    >
                        {uploadImageMutation.isPending ||
                        createCollectionMutation.isPending
                            ? "Завантаження..."
                            : "Додати"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
