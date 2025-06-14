"use client";

import { useCreateSize } from "@/lib/hooks/useSizes";
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
        // if (!name) {
        //     setMessage("Заповніть усі поля!");
        //     return;
        // }

        try {
            await createSizeMutation.mutateAsync({
                name,
            });
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
            <div className="bg-white p-[30px] shadow-lg max-w-[400px] w-full">
                <h2 className="text-lg font-bold mb-4">Додавання типу</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex gap-[20px] justify-between">
                        <div className="flex flex-col gap-[20px] w-full">
                            <div className="flex flex-col gap-[7px]">
                                <label htmlFor="name">Назва</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    className="border border-gray-200 rounded px-[10px] py-[7px] bg-gray-50 outline-0"
                                    placeholder="Назва типу"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    {/* {message && <p className="mt-4 text-red-500">{message}</p>} */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleClose}
                            className="px-[20px] py-[7px] bg-white text-black hover:bg-black hover:border-transparent hover:text-white cursor-pointer transition-all duration-200"
                            disabled={createSizeMutation.isPending}
                        >
                            Відмінити
                        </button>
                        <button
                            type="submit"
                            className="px-[20px] py-[7px] bg-black/70 border hover:bg-black hover:border-transparent text-white cursor-pointer transition-all duration-200"
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
