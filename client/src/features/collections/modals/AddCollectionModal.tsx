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

interface AddCollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddCollectionModal({
    isOpen,
    onClose,
}: AddCollectionModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [banner, setBanner] = useState<File | null>(null);
    const [status, setStatus] = useState<TStatus>("INACTIVE");
    const [preview, setPreview] = useState<string | null>(null);

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
        setName("");
        setPath("");
        setBanner(null);
        setStatus("INACTIVE");
        setPreview(null);
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim() || !path.trim() || !status) {
            return;
        }
        if (!banner) {
            return;
        }

        try {
            const uploadResult = await uploadImageMutation.mutateAsync(banner);
            const imagePath = uploadResult.path;

            await createCollectionMutation.mutateAsync({
                name,
                path,
                banner: imagePath,
                views: 0,
                status,
            });

            handleClose();
        } catch (error: any) {
            console.error("Помилка при створенні колекції:", error);
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Додавання колекції"}>
            <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
                <FormFillingWrapper>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InputField
                            label={"Назва"}
                            value={name}
                            onChangeValue={(e) => setName(e.target.value)}
                            id={"addCollectionName"}
                            name={"addCollectionName"}
                            placeholder={"Назва колекції"}
                            type={"text"}
                        />
                        <InputField
                            label={"Шлях"}
                            value={path}
                            onChangeValue={(e) => setPath(e.target.value)}
                            id={"addCollectionPath"}
                            name={"addCollectionPath"}
                            placeholder={"Шлях"}
                            type={"text"}
                        />
                        <div className="flex flex-col gap-[7px]">
                            <label
                                className="text-sm font-semibold"
                                htmlFor="status"
                            >
                                Статус
                            </label>
                            <select
                                name="status"
                                className="border border-white/10 rounded p-[10px] outline-0 cursor-pointer"
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value as TStatus)
                                }
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
