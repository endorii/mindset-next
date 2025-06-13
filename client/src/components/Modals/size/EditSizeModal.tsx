"use client";

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

    const handleConfirm = async () => {
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
        <div className="fixed inset-0 bg-black/70 flex items-center products-center justify-center z-100">
            <div className="bg-white p-[40px] h-[33vh] shadow-lg w-[20vw] overflow-y-auto">
                <div className="flex flex-col gap-[20px]">
                    <h2 className="text-lg font-bold mb-4">
                        Редагування кольору: {size.name || "Без назви"}
                    </h2>
                    <div className="flex flex-wrap gap-[20px]">
                        <div className="flex flex-col gap-[7px]">
                            <label htmlFor="name">Назва</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                                placeholder="Колір"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            onClick={onClose}
                            className="px-[20px] py-[7px] bg-white text-black hover:bg-black hover:border-transparent hover:text-white cursor-pointer transition-all duration-200"
                        >
                            Скасувати
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="px-[20px] py-[7px] bg-black/70 border hover:bg-black hover:border-transparent text-white cursor-pointer transition-all duration-200"
                        >
                            Підтвердити
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
