"use client";

import { ICollection } from "@/features/collections/types/collections.types";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useUploadImage } from "@/shared/hooks/useImages";
import { TStatus } from "@/shared/types/types";
import InputField from "@/shared/ui/inputs/InputField";
import { statuses } from "@/shared/utils/helpers";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { useEditCategory } from "../hooks/useCategories";
import { ICategory } from "../types/categories.types";
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

export default function EditCategoryModal({
    isOpen,
    onClose,
    collectionPath,
    category,
}: EditCategoryModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [status, setStatus] = useState<TStatus>("INACTIVE");
    const [banner, setBanner] = useState<string | File>("");
    const [preview, setPreview] = useState<string>("");

    const uploadImageMutation = useUploadImage();
    const editCategoryMutation = useEditCategory();

    useEffect(() => {
        if (category) {
            setName(category.name || "");
            setPath(category.path || "");
            setBanner(category.banner || "");
            setStatus(category.status || "INACTIVE");
            setPreview("");
        }
    }, [category]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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
                    name,
                    path,
                    status,
                    banner: bannerPath,
                },
            });

            onClose();
        } catch (error) {
            console.error("Помилка при редагуванні категорії:", error);
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
            <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
                <FormFillingWrapper>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InputField
                            label="Назва"
                            value={name}
                            onChangeValue={(e) => setName(e.target.value)}
                            id="editCategoryName"
                            name="editCategoryName"
                            placeholder="Назва категорії"
                            type="text"
                        />
                        <InputField
                            label="Шлях"
                            value={path}
                            onChangeValue={(e) => setPath(e.target.value)}
                            id="editCategoryPath"
                            name="editCategoryPath"
                            placeholder="Шлях"
                            type="text"
                        />
                        <div className="flex flex-col gap-[7px]">
                            <label
                                htmlFor="status"
                                className="font-semibold text-sm"
                            >
                                Статус
                            </label>
                            <select
                                name="status"
                                className="border border-white/10 rounded px-[10px] py-[10px] bg-black/20 text-white outline-0 cursor-pointer"
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value as TStatus)
                                }
                            >
                                <option
                                    className="text-white bg-black"
                                    disabled
                                >
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
