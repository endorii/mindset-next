"use client";

import { statuses } from "@/lib/helpers/helpers";
import { useCreateProduct } from "@/lib/hooks/useProducts";
import { ICategory, ICollection, IProduct, TStatus } from "@/types/types";
import { useState } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    categoryId: ICategory["id"];
    collectionPath: ICollection["path"];
    categoryPath: ICategory["path"];
}

export default function AddProductModal({
    isOpen,
    onClose,
    categoryId,
    collectionPath,
    categoryPath,
}: ModalProps) {
    const [name, setName] = useState("");
    const [path, setPath] = useState("");
    const [price, setPrice] = useState<IProduct["price"] | null>(null);
    const [available, setAvailable] = useState<IProduct["available"] | null>(
        null
    );
    const [description, setDescription] = useState<
        IProduct["description"] | null
    >(null);
    const [composition, setComposition] = useState<
        IProduct["composition"] | null
    >(null);
    const [status, setStatus] = useState<TStatus | null>(null);

    // const [banner, setBanner] = useState<File | null>(null);
    // const [preview, setPreview] = useState<string | null>(null);

    const [message, setMessage] = useState<string>("");

    // const uploadImageMutation = useUploadImage();
    const createProductMutation = useCreateProduct(
        collectionPath,
        categoryPath
    );

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const selectedFile = e.target.files?.[0];
    //     if (selectedFile) {
    //         setBanner(selectedFile);
    //         setPreview(URL.createObjectURL(selectedFile));
    //     }
    // };

    const handleClose = () => {
        // if (preview) URL.revokeObjectURL(preview);
        setName("");
        setPath("");
        setPrice(0);
        setAvailable(false);
        setDescription("");
        setComposition("");
        setStatus(null);

        // setBanner(null);
        // setPreview(null);

        setMessage("");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !name ||
            !path ||
            !status ||
            !price ||
            !description ||
            !composition
        ) {
            setMessage("Заповніть усі поля!");
            return;
        }

        // if (!banner) {
        //     setMessage("Виберіть зображення для банера!");
        //     return;
        // }

        try {
            // const uploadResult = await uploadImageMutation.mutateAsync(banner);
            // const imagePath = uploadResult.path;

            await createProductMutation.mutateAsync({
                name,
                path,
                // banner: imagePath,
                views: 0,
                status,
                categoryId,
                id: "",
                createdAt: "",
                updatedAt: "",
                price: 0,
                images: [],
                available: false,
                description: "",
                composition: "",
                sizes: [],
                types: [],
                colors: [],
            });

            setMessage("Товар успішно додано!");
            handleClose();
        } catch (error) {
            setMessage("Помилка при створенні товару");
            console.error(error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
            <div className="bg-white p-[40px] shadow-lg max-w-3xl w-full">
                <h2 className="text-lg font-bold mb-4">Додавання товару</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-[20px] justify-between">
                        <div className="flex flex-col gap-[20px] w-[50%]">
                            <div className="flex flex-col">
                                <label htmlFor="name">Назва</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="border-b py-2 px-1 outline-0"
                                    placeholder="Назва колекції"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="path">Шлях</label>
                                <input
                                    id="path"
                                    name="path"
                                    type="text"
                                    className="border-b py-2 px-1 outline-0"
                                    placeholder="Шлях (продублювати назву)"
                                    value={path}
                                    onChange={(e) => setPath(e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="price">Ціна</label>
                                <input
                                    id="price"
                                    name="price"
                                    type="text"
                                    className="border-b py-2 px-1 outline-0"
                                    placeholder="Ціна"
                                    value={name}
                                    onChange={(e) => setPrice(+e.target.value)}
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="description">Опис</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="border-b py-2 px-1 outline-0"
                                    value={name}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>

                            <div className="flex flex-col">
                                <label htmlFor="coposition">Склад</label>
                                <textarea
                                    id="coposition"
                                    name="coposition"
                                    className="border-b py-2 px-1 outline-0"
                                    value={name}
                                    onChange={(e) =>
                                        setComposition(e.target.value)
                                    }
                                />
                            </div>
                            {/* <div className="flex flex-col">
                                <label
                                    htmlFor="banner"
                                    className="mb-2 font-medium text-gray-700"
                                >
                                    Банер
                                </label>

                                <label
                                    htmlFor="banner"
                                    className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 shadow-sm hover:bg-black hover:text-white cursor-pointer transition-all duration-200"
                                >
                                    Завантажити зображення
                                </label>

                                <input
                                    id="banner"
                                    name="banner"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div> */}
                            <div className="flex flex-col">
                                <label htmlFor="available">Доступність</label>
                                <select
                                    name="available"
                                    className="border-b py-2 px-1 outline-0"
                                    value={
                                        available === null
                                            ? ""
                                            : available
                                            ? "true"
                                            : "false"
                                    }
                                    onChange={(e) =>
                                        setAvailable(e.target.value === "true")
                                    }
                                >
                                    <option value="" disabled>
                                        Оберіть доступність
                                    </option>
                                    <option value="true">Доступний</option>
                                    <option value="false">Недоступний</option>
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="status">Статус</label>
                                <select
                                    name="status"
                                    className="border-b py-2 px-1 outline-0"
                                    value={status ?? ""}
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
                        {/* <div className="flex flex-col gap-[20px] w-[50%]">
                            <img
                                className="object-contain h-[340px]"
                                src={preview || "../images/placeholder.png"}
                                alt="Банер"
                            />
                        </div> */}
                    </div>
                    {message && <p className="mt-4 text-red-500">{message}</p>}
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-[20px] py-[7px] bg-white text-black hover:bg-black hover:border-transparent hover:text-white cursor-pointer transition-all duration-200"
                            // disabled={
                            //     uploadImageMutation.isPending ||
                            //     createCollectionMutation.isPending
                            // }
                        >
                            Відмінити
                        </button>
                        <button
                            type="submit"
                            className="px-[20px] py-[7px] bg-black/70 border hover:bg-black hover:border-transparent text-white cursor-pointer transition-all duration-200"
                            // disabled={
                            //     uploadImageMutation.isPending ||
                            //     createCollectionMutation.isPending
                            // }
                        >
                            {/* {uploadImageMutation.isPending ||
                            createCollectionMutation.isPending
                                ? "Завантаження..."
                                : " */}
                            Додати
                            {/* " */}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
