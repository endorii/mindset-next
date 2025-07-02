"use client";

import InputField from "@/shared/ui/inputs/InputField";
import { useEditColor } from "../hooks/useColors";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { IColor } from "../types/product-color.types";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface EditColorProps {
    isOpen: boolean;
    onClose: () => void;
    color: IColor;
}

export default function EditColorModal({
    isOpen,
    onClose,
    color,
}: EditColorProps) {
    const [name, setName] = useState("");
    const [hexCode, setHexCode] = useState("#");

    const editColorMutation = useEditColor();

    const [isValidHex, setIsValidHex] = useState(true);

    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    const handleHexCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.trim();
        setHexCode(inputValue);
        setIsValidHex(hexRegex.test(inputValue));
    };

    useEffect(() => {
        if (color) {
            setName(color.name || "");
            setHexCode(color.hexCode || "#");
            setIsValidHex(color.hexCode ? hexRegex.test(color.hexCode) : false);
        }
    }, [color]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidHex) {
            alert("Введіть валідний HEX-код");
            return;
        }

        if (!name.trim()) {
            alert("Введіть назву кольору");
            return;
        }

        try {
            await editColorMutation.mutateAsync({
                colorId: color.id,
                data: { name: name.trim(), hexCode },
            });

            onClose();
        } catch (error) {
            console.error("Помилка при редагуванні кольору:", error);
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !color) return null;

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-black rounded-xl text-white bg-gradient-to-br from-black/0 to-white/5 border border-white/10 p-[30px] max-h-[80vh] shadow-lg w-[34vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-3xl font-thin mb-6">
                    Редагування кольору: {color.name || "Без назви"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[20px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                            <InputField
                                label="Назва"
                                value={name}
                                onChangeValue={(e) => setName(e.target.value)}
                                id="name"
                                name="name"
                                placeholder="Назва кольору"
                                type="text"
                            />
                            <InputField
                                label="HEX-код"
                                value={hexCode}
                                onChangeValue={handleHexCodeChange}
                                id="hex"
                                name="hex"
                                placeholder="#000000"
                                type="text"
                                className={`border border-white/10 rounded px-[10px] py-[7px] outline-0 ${
                                    isValidHex ? "" : "border-red-500"
                                }`}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={editColorMutation.isPending}
                            className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Скасувати
                        </button>
                        <button
                            type="submit"
                            disabled={editColorMutation.isPending}
                            className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer border border-white/10 rounded-xl hover:bg-white group transition-all duration-300 hover:text-black disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {editColorMutation.isPending
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
