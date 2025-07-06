"use client";

import InputField from "@/shared/ui/inputs/InputField";
import { useEditColor } from "../hooks/useColors";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { IColor } from "../types/product-color.types";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";

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
        <ModalWrapper onClose={onClose} modalTitle={"Редагування кольору"}>
            <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
                <FormFillingWrapper>
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
                </FormFillingWrapper>
                <FormButtonsWrapper>
                    <MonoButton
                        type="button"
                        onClick={onClose}
                        disabled={editColorMutation.isPending}
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={editColorMutation.isPending}
                    >
                        {editColorMutation.isPending
                            ? "Завантаження..."
                            : "Підтвердити"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
