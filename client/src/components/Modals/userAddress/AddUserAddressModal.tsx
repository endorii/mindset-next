"use client";

import InputField from "@/components/AdminPage/components/InputField";
import { useEscapeKeyClose } from "@/lib/hooks/useEscapeKeyClose";
import { useCreateUserAddress } from "@/lib/hooks/useUserAddress";
import { IUser } from "@/types/user/user.types";
import { useState } from "react";
import { createPortal } from "react-dom";

interface AddUserAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    userId: IUser["id"];
}

export default function AddUserAddressModal({
    isOpen,
    onClose,
    userId,
}: AddUserAddressModalProps) {
    const [recipient, setRecipient] = useState("");
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [street, setStreet] = useState("");
    const [building, setBuilding] = useState("");
    const [apartment, setApartment] = useState("");

    const createUserAddress = useCreateUserAddress();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!recipient) {
            alert("Будь ласка, введіть дані");
            return;
        }

        try {
            await createUserAddress.mutateAsync({
                userId,
                recipient,
                country,
                region,
                city,
                postalCode,
                street,
                building,
                apartment,
            });

            onClose();
        } catch (error) {
            console.error("Помилка при редагуванні адреси доставки:", error);
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen) return null;

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
                    Дадавання адреси доставки
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-[20px]">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px]">
                            <InputField
                                label={"Одержувач (ПІБ)"}
                                value={recipient}
                                onChangeValue={(e) =>
                                    setRecipient(e.target.value)
                                }
                                id={"editUserAddressRecipient"}
                                name={"editUserAddressRecipient"}
                                placeholder={"Іванов Іван Іванович"}
                                type={"text"}
                            />
                            <InputField
                                label={"Країна"}
                                value={country}
                                onChangeValue={(e) =>
                                    setCountry(e.target.value)
                                }
                                id={"editUserAddressCountry"}
                                name={"editUserAddressCountry"}
                                placeholder={"Україна"}
                                type={"text"}
                            />
                            <InputField
                                label={"Область"}
                                value={region}
                                onChangeValue={(e) => setRegion(e.target.value)}
                                id={"editUserAddressRegion"}
                                name={"editUserAddressRegion"}
                                placeholder={"Київська"}
                                type={"text"}
                            />
                            <InputField
                                label={"Місто"}
                                value={city}
                                onChangeValue={(e) => setCity(e.target.value)}
                                id={"editUserAddressCity"}
                                name={"editUserAddressCity"}
                                placeholder={"Київ"}
                                type={"text"}
                            />
                            <InputField
                                label={"Вулиця"}
                                value={street}
                                onChangeValue={(e) => setStreet(e.target.value)}
                                id={"editUserAddressStreet"}
                                name={"editUserAddressStreet"}
                                placeholder={"Степана Бандери"}
                                type={"text"}
                            />
                            <InputField
                                label={"Будинок"}
                                value={building}
                                onChangeValue={(e) =>
                                    setBuilding(e.target.value)
                                }
                                id={"editUserAddressBuilding"}
                                name={"editUserAddressBuilding"}
                                placeholder={"45"}
                                type={"text"}
                            />
                            <InputField
                                label={"Номер квартири/будинку"}
                                value={apartment}
                                onChangeValue={(e) =>
                                    setApartment(e.target.value)
                                }
                                id={"editUserAddressApartment"}
                                name={"editUserAddressApartment"}
                                placeholder={"12"}
                                type={"text"}
                            />
                            <InputField
                                label={"Поштовий індекс"}
                                value={postalCode}
                                onChangeValue={(e) =>
                                    setPostalCode(e.target.value)
                                }
                                id={"editUserAddressPostalCode"}
                                name={"editUserAddressPostalCode"}
                                placeholder={"01001"}
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
