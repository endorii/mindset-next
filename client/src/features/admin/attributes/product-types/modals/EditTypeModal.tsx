"use client";

import InputField from "@/shared/ui/inputs/InputField";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useEditType } from "../hooks/useTypes";
import { IType } from "../types/product-type.types";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface EditTypeProps {
    isOpen: boolean;
    onClose: () => void;
    type: IType;
}

export default function EditTypeModal({
    isOpen,
    onClose,
    type,
}: EditTypeProps) {
    const [name, setName] = useState("");

    const editTypeMutation = useEditType();

    useEffect(() => {
        if (type) {
            setName(type.name || "");
        }
    }, [type]);

    useEscapeKeyClose({ isOpen, onClose });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await editTypeMutation.mutateAsync({
                typeId: type.id,
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

    if (!isOpen || !type) return null;
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
                    Редагування типу: {type.name || "Без назви"}
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
                                placeholder={"Назва типу"}
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
                            disabled={editTypeMutation.isPending}
                        >
                            Скасувати
                        </button>
                        <button
                            type="submit"
                            className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                            disabled={editTypeMutation.isPending}
                        >
                            {editTypeMutation.isPending
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
