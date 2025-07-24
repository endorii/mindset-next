"use client";

import {
    EditUserInfoModal,
    AddUserAddressModal,
    EditUserAddressModal,
} from "@/features/admin";
import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { EditIcon } from "@/shared/icons";
import { AttributeModalType } from "@/shared/types/types";
import MonoButton from "@/shared/ui/buttons/MonoButton";
import { redirect } from "next/navigation";

import { useEffect, useState } from "react";

function Account() {
    const { data: user, isLoading, isError } = useCurrentUser();
    const [activeModal, setActiveModal] = useState<AttributeModalType>(null);

    const replasePassword = (password?: string) => {
        let result = "";
        if (password) {
            for (let i = 0; i < password.length; i++) {
                result += "*";
            }
        }
        return result;
    };

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
        // Можете відобразити спіннер або лоадер поки дані завантажуються
        return <div>Loading user data...</div>;
    }

    if (isError) {
        // Обробка помилки завантаження даних
        return <div>Error loading user data. Please try again.</div>;
    }

    return (
        <div>
            <div className="flex w-full justify-between gap-[20px]">
                <div className="relative flex flex-col group gap-[10px] w-1/3 rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
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
                <div className="relative flex flex-col group gap-[10px] w-1/3 rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
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
                <div className="flex flex-col gap-[10px] w-1/3 rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="font-bold">Доставка та оплата</div>
                    <div className="relative p-[30px] flex flex-col gap-[7px] h-full">
                        <div className="flex gap-[10px] items-center">
                            <img
                                // src={NewPostLogo}
                                alt=""
                                className="max-w-[40px]"
                            />
                            <div>У відділення Нова Пошта</div>
                        </div>
                        <hr className="mt-[10px] border-t border-white/10" />
                        <div className="flex gap-[10px] items-center">
                            <img
                                // src={CardLogo}
                                alt=""
                                className="max-w-[40px]"
                            />
                            <div>Оплата карткою онлайн</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-[10px] mt-[20px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="font-bold">Зміна паролю</div>
                <div className="relative p-[30px] flex flex-col gap-[7px]">
                    <button className="absolute top-0 right-0 group flex text-xs items-center gap-[20px] border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white p-[10px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed">
                        <EditIcon className="w-[20px] stroke-white fill-none stroke-2 group-hover:stroke-black transition-all duration-300" />
                    </button>
                    <div>{replasePassword(user?.password)}</div>
                </div>
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
            </>
        </div>
    );
}

export default Account;
