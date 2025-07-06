"use client";

import InputField from "@/shared/ui/inputs/InputField";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useCreateSize } from "../hooks/useSizes";
import { useState } from "react";
import { createPortal } from "react-dom";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";
import FormButtonsWrapper from "@/shared/ui/wrappers/FormButtonsWrapper";
import FormFillingWrapper from "@/shared/ui/wrappers/FormFillingWrapper";

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
        <ModalWrapper onClose={onClose} modalTitle={"Додавання розміру"}>
            <form className="flex flex-col gap-[20px]" onSubmit={handleSubmit}>
                <FormFillingWrapper>
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
                </FormFillingWrapper>
                <FormButtonsWrapper>
                    <MonoButton
                        type="button"
                        onClick={handleClose}
                        disabled={createSizeMutation.isPending}
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={createSizeMutation.isPending}
                    >
                        {createSizeMutation.isPending
                            ? "Завантаження..."
                            : "Додати"}
                    </MonoButton>
                </FormButtonsWrapper>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
