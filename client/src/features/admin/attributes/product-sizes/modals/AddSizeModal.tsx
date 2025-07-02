"use client";

import InputField from "@/shared/ui/inputs/InputField";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useCreateSize } from "../hooks/useSizes";
import { useState } from "react";
import { createPortal } from "react-dom";

interface AddSizeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddSizeModal({ isOpen, onClose }: AddSizeModalProps) {
    const [name, setName] = useState("");

    const createSizeMutation = useCreateSize();

    const handleClose = () => {
        setName("");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createSizeMutation.mutateAsync({
                name,
            });
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/70 flex items-center products-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-white p-[30px] h-auto max-h-[80vh] shadow-lg w-[20vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold mb-4">Додавання розімру</h2>
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
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                            disabled={createSizeMutation.isPending}
                        >
                            Скасувати
                        </button>
                        <button
                            type="submit"
                            className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                            disabled={createSizeMutation.isPending}
                        >
                            {createSizeMutation.isPending
                                ? "Завантаження..."
                                : "Додати"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
