"use client";

import InputField from "@/shared/ui/inputs/InputField";
import { useEscapeKeyClose } from "@/shared/hooks/useEscapeKeyClose";
import { useEditUser } from "../hooks/useUsers";
import { IUser } from "../types/user.types";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import MonoButton from "@/shared/ui/buttons/MonoButton";

interface EditUserInfoModalProps {
    isOpen: boolean;
    onClose: () => void;
    user: IUser | undefined;
}

export default function EditUserInfoModal({
    isOpen,
    onClose,
    user,
}: EditUserInfoModalProps) {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const editUserMutation = useEditUser();

    useEffect(() => {
        if (user) {
            setUserName(user.name || "");
            setEmail(user.email || "");
            setPhoneNumber(user.phone || "");
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userName) {
            alert("Будь ласка, введіть дані");
            return;
        }

        try {
            await editUserMutation.mutateAsync({
                id: user?.id || "",
                data: {
                    name: userName,
                    email,
                    phone: phoneNumber,
                },
            });

            onClose();
        } catch (error) {
            console.error("Помилка при редагуванні адреси доставки:", error);
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !user) return null;

    const modalContent = (
        <div
            className="fixed inset-0 bg-black/80 flex items-center products-center justify-center z-100 cursor-pointer text-white"
            onClick={onClose}
        >
            <div
                className="bg-gradient-to-br from-black to-white/5 border border-white/10 rounded-xl p-[30px] h-auto max-h-[80vh] shadow-lg w-[54vw] overflow-y-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-lg font-bold mb-4">
                    Редагування інформації користувача
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[20px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                            <InputField
                                label={"Нікнейм"}
                                value={userName}
                                onChangeValue={(e) =>
                                    setUserName(e.target.value)
                                }
                                id={"editUserInfoUsername"}
                                name={"editUserInfoUsername"}
                                placeholder={"bigtester123"}
                                type={"text"}
                            />
                            <InputField
                                label={"Електронна пошта"}
                                value={email}
                                onChangeValue={(e) => setEmail(e.target.value)}
                                id={"editUserInfoEmail"}
                                name={"editUserInfoEmail"}
                                placeholder={"bigtester@gmail.com"}
                                type={"text"}
                            />
                            <InputField
                                label={"Номер телефону"}
                                value={phoneNumber}
                                onChangeValue={(e) =>
                                    setPhoneNumber(e.target.value)
                                }
                                id={"editUserInfoPhone"}
                                name={"editUserInfoPhone"}
                                placeholder={"Київська"}
                                type={"text"}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <MonoButton onClick={onClose}>Скасувати</MonoButton>
                        <MonoButton type="submit">Підтвердити</MonoButton>
                    </div>
                </form>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
