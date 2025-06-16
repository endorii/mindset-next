"use client";

import InputField from "@/components/AdminPage/components/InputField";
import { useEscapeKeyClose } from "@/lib/hooks/useEscapeKeyClose";
import { useEditSize } from "@/lib/hooks/useSizes";
import { ISize } from "@/types/size/size.types";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface EditSizeProps {
    isOpen: boolean;
    onClose: () => void;
    size: ISize;
}

export default function EditSizeModal({
    isOpen,
    onClose,
    size,
}: EditSizeProps) {
    const [name, setName] = useState("");

    const editSizeMutation = useEditSize();

    useEffect(() => {
        if (size) {
            setName(size.name || "");
        }
    }, [size]);

    useEscapeKeyClose({ isOpen, onClose });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await editSizeMutation.mutateAsync({
                sizeId: size.id,
                data: {
                    name,
                },
            });

            onClose();
            console.log("Відправлено на редагування");
        } catch (error) {
            console.error("Помилка при редагуванні розміру:", error);
        }
    };

    if (!isOpen || !size) return null;
    const modalContent = (
        <div
            className="fixed inset-0 bg-black/70 flex items-center products-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-white p-[30px] h-auto max-h-[80vh] shadow-lg w-[20vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold mb-4">
                    Редагування розміру: {size.name || "Без назви"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-[20px] justify-between">
                        <div className="flex flex-col gap-[20px] w-full">
                            <InputField
                                label={"Назва"}
                                value={name}
                                onChangeValue={(e) => setName(e.target.value)}
                                id={"name"}
                                name={"name"}
                                placeholder={"Назва розміру"}
                                type={"text"}
                            />
                        </div>
                    </div>
                    {/* {message && <p className="mt-4 text-red-500">{message}</p>} */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                            disabled={editSizeMutation.isPending}
                        >
                            Скасувати
                        </button>
                        <button
                            type="submit"
                            className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                            disabled={editSizeMutation.isPending}
                        >
                            {editSizeMutation.isPending
                                ? "Завантаження..."
                                : "Підтвердити"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
