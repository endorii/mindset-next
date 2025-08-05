"use client";

import {
    EditUserInfoModal,
    AddUserAddressModal,
    EditUserAddressModal,
} from "@/features/admin";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import {
    ChangePasswordModal,
    DeleteAccountModal,
} from "@/features/admin/user-info/modals";
import { AttributeModalType } from "@/shared/types/types";
import { MonoButton } from "@/shared/ui/buttons";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

function Account() {
    const { data: user, isLoading, isError } = useCurrentUser();
    const [activeModal, setActiveModal] = useState<AttributeModalType>(null);

    const openModal = (type: AttributeModalType) => {
        setActiveModal(type);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    useEffect(() => {
        if (!isLoading && !user) {
            redirect("/auth");
        }
    }, [user, isLoading]);

    if (isLoading) {
        return <div>Loading user data...</div>;
    }

    if (isError) {
        redirect("/auth");
    }

    return (
        <div className="flex flex-col gap-[15px]">
            <div className="flex lg:flex-wrap w-full justify-between gap-[15px]">
                <div className="relative flex flex-col group gap-[10px] w-1/2 lg:w-full rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <button
                        className="absolute top-0 right-0 flex h-full w-full items-center justify-center rounded-xl bg-black/80 uppercase text-2xl font-light opacity-0 group-hover:opacity-100 transition-all duration-400 cursor-pointer z-10"
                        onClick={() => openModal("editUserInfo")}
                    >
                        Редагувати
                    </button>
                    <div className="font-bold">Основна інформація</div>
                    <ul className="p-[30px] flex flex-col gap-[7px] h-full">
                        <li>{user?.name}</li>
                        <li>{user?.email}</li>
                        <li>{user?.phone}</li>
                    </ul>
                </div>
                <div className="relative flex flex-col group gap-[10px] w-1/2 lg:w-full rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="font-bold">Адреса доставки</div>
                    <div className="p-[30px] flex flex-col gap-[7px] h-full">
                        {user?.shippingAddress ? (
                            <>
                                <button
                                    className="absolute top-0 right-0 flex h-full w-full items-center justify-center rounded-xl bg-black/80 uppercase text-2xl font-light opacity-0 group-hover:opacity-100 transition-all duration-400 cursor-pointer z-10"
                                    onClick={() => openModal("editUserAddress")}
                                >
                                    Редагувати
                                </button>
                                <div>{user?.shippingAddress?.recipient}</div>
                                <div>
                                    {user?.shippingAddress?.country},{" "}
                                    {user?.shippingAddress?.region} обл.
                                </div>
                                <div>
                                    {user?.shippingAddress?.city}, вул.{" "}
                                    {user?.shippingAddress?.street}{" "}
                                    {user?.shippingAddress?.building},{" "}
                                    {user?.shippingAddress?.apartment}
                                </div>
                                <div>{user?.shippingAddress?.postalCode}</div>{" "}
                            </>
                        ) : (
                            <MonoButton
                                onClick={() => openModal("addUserAddress")}
                            >
                                Додати адресу
                            </MonoButton>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex lg:flex-wrap gap-[15px]">
                <div className="flex flex-col gap-[10px] w-1/3 lg:w-full rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="font-bold">Зміна паролю</div>
                    <MonoButton onClick={() => openModal("changePassword")}>
                        Змінити пароль
                    </MonoButton>
                </div>
                <div className="flex flex-col gap-[10px] w-2/3 lg:w-full rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="font-bold text-xl mb-4">
                        Доставка та оплата
                    </div>

                    <div className="flex md:flex-wrap gap-[15px] items-start">
                        <img
                            // src={NewPostLogo}
                            alt="Нова Пошта"
                            className="max-w-[50px] flex-shrink-0"
                        />
                        <div className="flex md:flex-wrap gap-[15px]">
                            <div className="flex flex-col gap-[10px]">
                                <div className="font-semibold text-lg">
                                    Доставка у відділення "Нова Пошта"
                                </div>
                                <div className="text-sm text-gray-300  max-w-md">
                                    Отримуйте свої замовлення у найближчому
                                    відділенні "Нова Пошта". Зручне
                                    самовивезення, швидка обробка та відстеження
                                    посилки.
                                </div>
                            </div>
                            <ul className="list-disc list-inside mt-2 text-sm text-gray-400">
                                <li>Термін доставки: 1-3 робочі дні</li>
                                <li>Відстеження посилки у реальному часі</li>
                                <li>Можливість оплатити при отриманні</li>
                            </ul>
                        </div>
                    </div>

                    <hr className="border-t border-white/10" />

                    {/* Оплата */}
                    <div className="flex md:flex-wrap gap-[15px] items-start">
                        <img
                            // src={CardLogo}
                            alt="Оплата карткою"
                            className="max-w-[50px] flex-shrink-0"
                        />
                        <div className="flex md:flex-wrap gap-[15px]">
                            <div className="flex flex-col gap-[10px]">
                                <div className="font-semibold text-lg">
                                    Оплата карткою онлайн
                                </div>
                                <div className="text-sm text-gray-300 max-w-md">
                                    Швидка і безпечна оплата банківськими
                                    картками Visa, MasterCard та іншими
                                    популярними платіжними системами.
                                    Підтвердження платежу відразу.
                                </div>
                            </div>
                            <ul className="list-disc list-inside mt-2 text-sm text-gray-400">
                                <li>
                                    Підтримка 3D Secure для безпеки платежів
                                </li>
                                <li>
                                    Оплата з мобільних пристроїв та комп’ютерів
                                </li>
                                <li>
                                    Можливість збереження даних для швидших
                                    покупок
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-[10px] w-full h-fit rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="font-bold">Видалити акаунт </div>
                <MonoButton
                    className="bg-red-500/15 border border-white/10 hover:bg-red-500/70! hover:text-white!"
                    onClick={() => openModal("deleteAccount")}
                >
                    Видалити акаунт
                </MonoButton>
            </div>
            <>
                <EditUserInfoModal
                    isOpen={activeModal === "editUserInfo"}
                    onClose={closeModal}
                    user={user}
                />
                <AddUserAddressModal
                    isOpen={activeModal === "addUserAddress"}
                    onClose={closeModal}
                    userId={user?.id ?? ""}
                />
                <EditUserAddressModal
                    isOpen={activeModal === "editUserAddress"}
                    onClose={closeModal}
                    address={user?.shippingAddress}
                />
                <ChangePasswordModal
                    isOpen={activeModal === "changePassword"}
                    onClose={closeModal}
                />
                <DeleteAccountModal
                    isOpen={activeModal === "deleteAccount"}
                    onClose={closeModal}
                />
            </>
        </div>
    );
}

export default Account;
