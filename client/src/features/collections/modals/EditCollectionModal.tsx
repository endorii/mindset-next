"use client";

import { deleteImage } from "@/shared/api/images.api";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useUploadImage } from "@/shared/hooks/useImages";
import { TStatus } from "@/shared/types/types";
import InputField from "@/shared/ui/inputs/InputField";
import { statuses } from "@/shared/utils/helpers";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import { createPortal } from "react-dom";
import { useEditCollection } from "../hooks/useCollections";
import { ICollection } from "../types/collections.types";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";

interface EditCollectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    collection: ICollection;
}

export default function EditCollectionModal({
    isOpen,
    onClose,
    collection,
}: EditCollectionModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [status, setStatus] = useState<TStatus>("INACTIVE");
    const [banner, setBanner] = useState<string | File>("");
    const [preview, setPreview] = useState("");

    const uploadImageMutation = useUploadImage();
    const editCollection = useEditCollection();

    useEffect(() => {
        if (collection) {
            setName(collection.name || "");
            setPath(collection.path || "");
            setBanner(collection.banner || "");
            setStatus(collection.status);
            setPreview("");
        }
    }, [collection]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!status) {
            alert("Будь ласка, оберіть статус колекції");
            return;
        }

        try {
            let bannerPath = typeof banner === "string" ? banner : "";

            if (banner instanceof File) {
                if (
                    typeof collection.banner === "string" &&
                    collection.banner.startsWith("/images/")
                ) {
                    await deleteImage(collection.banner);
                }

                const uploadImage = await uploadImageMutation.mutateAsync(
                    banner
                );
                bannerPath = uploadImage.path;
            }

            await editCollection.mutateAsync({
                collectionPath: collection.path,
                data: {
                    name,
                    path,
                    status,
                    banner: bannerPath,
                },
            });

            onClose();
        } catch (error) {
            console.error("Помилка при редагуванні колекції:", error);
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

    const bannerSrc =
        typeof banner === "string" && banner.startsWith("/images/")
            ? `http://localhost:5000${banner}`
            : "";

    const modalContent = (
        <ModalWrapper
            onClose={onClose}
            modalTitle={`Редагування колекції ${name}`}
        >
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-[20px]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                        <InputField
                            label={"Назва"}
                            value={name}
                            onChangeValue={(e) => setName(e.target.value)}
                            id={"editCollectionName"}
                            name={"editCollectionName"}
                            placeholder={"Назва колекції"}
                            type={"text"}
                        />
                        <InputField
                            label={"Шлях"}
                            value={path}
                            onChangeValue={(e) => setPath(e.target.value)}
                            id={"editCollectionPath"}
                            name={"editCollectionPath"}
                            placeholder={"Шлях"}
                            type={"text"}
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
                                    cursor-pointer
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
                                <span className="text-4xl text-white/40">
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
                </div>
                <div className="flex justify-end gap-4 mt-6">
                    <MonoButton type="button" onClick={onClose}>
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
                </div>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
