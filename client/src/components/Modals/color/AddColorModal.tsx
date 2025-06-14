"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useCreateColor } from "@/lib/hooks/useColors";

interface AddColorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddColorModal({ isOpen, onClose }: AddColorModalProps) {
    const [name, setName] = useState("");
    const [hexCode, setHexCode] = useState("#");

    const createColorMutation = useCreateColor();

    const handleClose = () => {
        setName("");
        setHexCode("#");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // if (!name) {
        //     setMessage("Заповніть усі поля!");
        //     return;
        // }

        try {
            await createColorMutation.mutateAsync({
                name,
                hexCode,
            });
            handleClose();
        } catch (error) {
            console.error(error);
        }
    };

    const [isValidHex, setIsValidHex] = useState(true);

    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    const handleHexCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setHexCode(inputValue);

        setIsValidHex(hexRegex.test(inputValue));
    };

    if (!isOpen) return null;

    const modalContent = (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-100">
            <div className="bg-white p-[30px] shadow-lg max-w-[400px] w-full">
                <h2 className="text-lg font-bold mb-4">Додавання кольору</h2>
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
                                    placeholder="Назва кольору"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-[7px]">
                                <label htmlFor="path">HEX-код</label>
                                <input
                                    id="path"
                                    name="path"
                                    type="text"
                                    className={`border rounded px-[10px] py-[7px] bg-gray-50 outline-0 ${
                                        isValidHex
                                            ? "border-gray-200"
                                            : "border-red-500"
                                    }`}
                                    placeholder="#000000"
                                    value={hexCode}
                                    onChange={handleHexCodeChange}
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
                            disabled={createColorMutation.isPending}
                        >
                            Відмінити
                        </button>
                        <button
                            type="submit"
                            className="px-[20px] py-[7px] bg-black/70 border hover:bg-black hover:border-transparent text-white cursor-pointer transition-all duration-200"
                            disabled={createColorMutation.isPending}
                        >
                            {createColorMutation.isPending
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
