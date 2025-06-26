"use client";

import InputField from "@/components/AdminPage/components/InputField";
import { useEscapeKeyClose } from "@/lib/hooks/useEscapeKeyClose";
import { useEditUser } from "@/lib/hooks/useUsers";
import { IUser } from "@/types/user/user.types";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

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
            className="fixed inset-0 bg-black/70 flex items-center products-center justify-center z-100 cursor-pointer"
            onClick={onClose}
        >
            <div
                className="bg-white p-[30px] h-auto max-h-[80vh] shadow-lg w-[54vw] overflow-y-auto cursor-default"
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
                        <button
                            onClick={onClose}
                            className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                        >
                            Скасувати
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                        >
                            Підтвердити
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

    return createPortal(modalContent, document.body);
}
