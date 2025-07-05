"use client";

import InputField from "@/shared/ui/inputs/InputField";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useEditType } from "../hooks/useTypes";
import { IType } from "../types/product-type.types";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import ModalWrapper from "@/shared/ui/wrappers/ModalWrapper";

interface EditTypeProps {
    isOpen: boolean;
    onClose: () => void;
    type: IType;
}

export default function EditTypeModal({
    isOpen,
    onClose,
    type,
}: EditTypeProps) {
    const [name, setName] = useState("");

    const editTypeMutation = useEditType();

    useEffect(() => {
        if (type) {
            setName(type.name || "");
        }
    }, [type]);

    useEscapeKeyClose({ isOpen, onClose });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await editTypeMutation.mutateAsync({
                typeId: type.id,
                data: {
                    name,
                },
            });

            onClose();
            console.log("Відправлено на редагування");
        } catch (error) {
            console.error("Помилка при редагуванні розміру:", error);
        }
    };

    if (!isOpen || !type) return null;
    const modalContent = (
        <ModalWrapper onClose={onClose} modalTitle={"Редагування типу"}>
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
                        onClick={onClose}
                        disabled={editTypeMutation.isPending}
                    >
                        Скасувати
                    </MonoButton>
                    <MonoButton
                        type="submit"
                        disabled={editTypeMutation.isPending}
                    >
                        {editTypeMutation.isPending
                            ? "Завантаження..."
                            : "Підтвердити"}
                    </MonoButton>
                </div>
            </form>
        </ModalWrapper>
    );

    return createPortal(modalContent, document.body);
}
