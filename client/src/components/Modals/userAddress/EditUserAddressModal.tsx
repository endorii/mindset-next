"use client";

import InputField from "@/components/AdminPage/components/InputField";
import { useEscapeKeyClose } from "@/lib/hooks/useEscapeKeyClose";
import { useEditUserAddress } from "@/lib/hooks/useUserAddress";
import { IUserShippingAdress } from "@/types/user/user.types";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface EditUserAddressModalProps {
    isOpen: boolean;
    onClose: () => void;
    address: IUserShippingAdress | undefined;
}

export default function EditUserAddressModal({
    isOpen,
    onClose,
    address,
}: EditUserAddressModalProps) {
    const [recipient, setRecipient] = useState("");
    const [country, setCountry] = useState("");
    const [region, setRegion] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [street, setStreet] = useState("");
    const [building, setBuilding] = useState("");
    const [apartment, setApartment] = useState("");

    const editUserAddress = useEditUserAddress();

    useEffect(() => {
        if (address) {
            setRecipient(address.recipient || "");
            setCountry(address.country || "");
            setRegion(address.region || "");
            setCity(address.city || "");
            setPostalCode(address.postalCode || "");
            setStreet(address.street || "");
            setBuilding(address.building || "");
            setApartment(address.apartment || "");
        }
    }, [address]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!recipient) {
            alert("Будь ласка, введіть дані");
            return;
        }

        try {
            await editUserAddress.mutateAsync({
                userId: address?.userId || "",
                data: {
                    recipient,
                    country,
                    region,
                    city,
                    postalCode,
                    street,
                    building,
                    apartment,
                },
            });

            onClose();
        } catch (error) {
            console.error("Помилка при редагуванні адреси доставки:", error);
        }
    };

    useEscapeKeyClose({ isOpen, onClose });

    if (!isOpen || !address) return null;

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
                    Редагування адреси доставки
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
                                id={"editUserAddressRecipient"}
                                name={"editUserAddressRecipient"}
                                placeholder={"01001"}
                                type={"text"}
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            onClick={onClose}
                            className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Скасувати
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="flex gap-[15px] px-[25px] py-[13px] items-center cursor-pointer p-[10px] border border-white/10 rounded-xl hover:bg-white hover:text-black transition-all duration-300"
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
