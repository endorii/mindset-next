"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import InputField from "@/shared/ui/inputs/InputField";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useCreateColor } from "../hooks/useColors";

interface AddColorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddColorModal({ isOpen, onClose }: AddColorModalProps) {
    const [name, setName] = useState("");
    const [hexCode, setHexCode] = useState("#");
    const [isValidHex, setIsValidHex] = useState(true);

    const createColorMutation = useCreateColor();

    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

    const handleHexCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setHexCode(inputValue);
        setIsValidHex(hexRegex.test(inputValue));
    };

    const handleClose = () => {
        setName("");
        setHexCode("#");
        setIsValidHex(true);
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !hexRegex.test(hexCode)) {
            setIsValidHex(false);
            return;
        }
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

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/85 flex items-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div className="bg-black">
                <div
                    className="rounded-xl text-white bg-gradient-to-br from-black/0 to-white/5 border border-white/10 p-[30px] max-h-[80vh] shadow-lg w-[34vw] overflow-y-auto cursor-default"
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-3xl font-thin mb-4">
                        Додавання кольору
                    </h2>
                    <hr className="border-t border-white/10 py-[10px] mb-6" />
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-[20px]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
                                <InputField
                                    label={"Назва"}
                                    value={name}
                                    onChangeValue={(e) =>
                                        setName(e.target.value)
                                    }
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
                                    className={`border rounded px-[10px] py-[7px] outline-0 bg-black/10 text-white ${
                                        isValidHex
                                            ? "border-white/20"
                                            : "border-red-500"
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={createColorMutation.isPending}
                                className="px-[20px] py-[7px] border border-white/10 rounded-xl hover:bg-white hover:text-black hover:border-black cursor-pointer transition-all duration-300"
                            >
                                Скасувати
                            </button>
                            <button
                                type="submit"
                                disabled={createColorMutation.isPending}
                                className="px-[20px] py-[7px] border border-white/10 rounded-xl hover:bg-white hover:text-black hover:border-black cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {createColorMutation.isPending
                                    ? "Завантаження..."
                                    : "Додати"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
