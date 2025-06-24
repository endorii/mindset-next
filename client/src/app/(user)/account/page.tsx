"use client";

import EditIcon from "@/components/Icons/EditIcon";
import AddUserAddressModal from "@/components/Modals/userAddress/AddUserAddressModal";
import EditUserAddressModal from "@/components/Modals/userAddress/EditUserAddressModal";
import EditUserInfoModal from "@/components/Modals/userInfo/EditUserInfoModal";
import { useUser } from "@/lib/hooks/useUsers";
import { AttributeModalType } from "@/types/types";
import { useEffect, useState } from "react";

function Account() {
    const { data: user } = useUser("");
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
        // if (!user) {
        //     router.replace("/login");
        // }
    }, []);

    return (
        <div>
            <div className="flex w-full justify-between mt-[30px] items-stretch gap-[20px]">
                <div className="flex flex-col gap-[10px] w-1/3">
                    <div className="font-bold">Основна інформація</div>
                    <ul className="relative bg-gray-50 p-[30px] flex flex-col gap-[7px] h-full">
                        <button
                            className="absolute top-0 right-0 group flex text-xs items-center gap-[20px] border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white p-[10px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed"
                            onClick={() => openModal("editUserInfo")}
                        >
                            <EditIcon className="w-[20px] stroke-white fill-none stroke-2 group-hover:stroke-black transition-all duration-300" />
                        </button>
                        <li>{user?.username}</li>
                        <li>{user?.email}</li>
                        <li>{user?.phone}</li>
                    </ul>
                </div>
                <div className="flex flex-col gap-[10px] w-1/3">
                    <div className="font-bold">Адреса доставки</div>
                    <div className="relative bg-gray-50 p-[30px] flex flex-col gap-[7px] h-full">
                        {user?.shippingAddress ? (
                            <>
                                <button
                                    className="absolute top-0 right-0 group flex text-xs items-center gap-[20px] border border-transparent hover:text-black hover:border-black hover:bg-white bg-black text-white p-[10px] transition-all duration-300 cursor-pointer disabled:bg-gray-200 disabled:text-gray-400 disabled:border-0 disabled:cursor-not-allowed"
                                    onClick={() => openModal("editUserAddress")}
                                >
                                    <EditIcon className="w-[20px] stroke-white fill-none stroke-2 group-hover:stroke-black transition-all duration-300" />
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
                            <button
                                className="px-[20px] py-[7px] border border-transparent bg-black text-white hover:bg-white hover:border-black hover:text-black cursor-pointer transition-all duration-200"
                                onClick={() => openModal("addUserAddress")}
                            >
                                Додати адресу
                            </button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col gap-[10px] w-1/3">
                    <div className="font-bold">Доставка та оплата</div>
                    <div className="relative bg-gray-50 p-[30px] flex flex-col gap-[7px] h-full">
                        <div className="flex gap-[10px] items-center">
                            <img
                                // src={NewPostLogo}
                                alt=""
                                className="max-w-[40px]"
                            />
                            <div>У відділення Нова Пошта</div>
                        </div>
                        <hr className="mt-[10px] border-b border-gray-200" />
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

            <div className="flex flex-col gap-[10px] mt-[20px]">
                <div className="font-bold">Зміна паролю</div>
                <div className="relative bg-gray-50 p-[30px] flex flex-col gap-[7px]">
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
