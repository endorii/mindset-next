"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import InputField from "@/shared/ui/inputs/InputField";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useCreateType } from "../hooks/useTypes";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";

interface AddTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddTypeModal({ isOpen, onClose }: AddTypeModalProps) {
    const [name, setName] = useState("");

    const createTypeMutation = useCreateType();

    const handleClose = () => {
        setName("");
        onClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await createTypeMutation.mutateAsync({
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
        <ModalWrapper onClose={onClose} modalTitle={"Додавання типу"}>
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
                <div className="flex justify-end gap-4 mt-6">
                    <MonoButton
                        type="button"
                        onClick={handleClose}
                        disabled={createTypeMutation.isPending}
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={createTypeMutation.isPending}
                    >
                        {createTypeMutation.isPending
                            ? "Завантаження..."
                            : "Додати"}
                    </MonoButton>
                </div>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
