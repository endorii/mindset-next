"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import InputField from "@/shared/ui/inputs/InputField";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useCreateColor } from "../hooks/useColors";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";

interface AddColorModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddColorModal({ isOpen, onClose }: AddColorModalProps) {
    const [name, setName] = useState("");
    const [hexCode, setHexCode] = useState("#");

    const createColorMutation = useCreateColor();

    const handleHexCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setHexCode(inputValue);
    };

    const handleClose = () => {
        setName("");
        setHexCode("#");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) {
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
        <ModalWrapper onClose={onClose} modalTitle={"Додавання кольору"}>
            <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
                <FormFillingWrapper>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[20px]">
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
                        />
                    </div>
                </FormFillingWrapper>
                <FormButtonsWrapper>
                    <MonoButton
                        onClick={handleClose}
                        type="button"
                        disabled={createColorMutation.isPending}
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={
                            !name || !hexCode || createColorMutation.isPending
                        }
                    >
                        {createColorMutation.isPending
                            ? "Завантаження..."
                            : "Додати"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
