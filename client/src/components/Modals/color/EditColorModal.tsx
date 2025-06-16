"use client";

import InputField from "@/components/AdminPage/components/InputField";
import { useEditColor } from "@/lib/hooks/useColors";
import { useEscapeKeyClose } from "@/lib/hooks/useEscapeKeyClose";
import { IColor } from "@/types/color/color.types";
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
        const inputValue = e.target.value;
        setHexCode(inputValue);

        setIsValidHex(hexRegex.test(inputValue));
    };

    useEffect(() => {
        if (color) {
            setName(color.name || "");
            setHexCode(color.hexCode || "#");
        }
    }, [color]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await editColorMutation.mutateAsync({
                colorId: color.id,
                data: {
                    name,
                    hexCode: hexCode,
                },
            });

            onClose();
            console.log("Відправлено на редагування");
        } catch (error) {
            console.error("Помилка при редагуванні кольору:", error);
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !color) return null;

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/70 flex items-center products-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-white p-[30px] h-auto max-h-[80vh] shadow-lg w-[34vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold mb-4">
                    Редагування кольору: {color.name || "Без назви"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[20px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-[20px]">
                            <InputField
                                label={"Назва"}
                                value={name}
                                onChangeValue={(e) => setName(e.target.value)}
                                id={"name"}
                                name={"name"}
                                placeholder={"Назва кольору"}
                                type={"text"}
                            />
                            <InputField
                                label={"HEX-код"}
                                value={hexCode}
                                onChangeValue={handleHexCodeChange}
                                id={"hex"}
                                name={"hex"}
                                placeholder={"#000000"}
                                type={"text"}
                                className={`border rounded px-[10px] py-[7px] bg-gray-50 outline-0 ${
                                    isValidHex
                                        ? "border-gray-200"
                                        : "border-red-500"
                                }`}
                            />
                        </div>
                    </div>
                    {/* {message && <p className="mt-4 text-red-500">{message}</p>} */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                            disabled={editColorMutation.isPending}
                        >
                            Скасувати
                        </button>
                        <button
                            type="submit"
                            className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                            disabled={editColorMutation.isPending}
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
