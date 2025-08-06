"use client";

import {
    ChangePassword,
    DeleteAccount,
    DeliveryAddress,
    DeliveryAndPaymentMethod,
    MainInfo,
} from "@/features/account/components";
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
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

function Account() {
    const {
        data: user,
        isPending: isUserPending,
        isError: isUserError,
    } = useCurrentUser();
    const [activeModal, setActiveModal] = useState<AttributeModalType>(null);

    const openModal = (type: AttributeModalType) => {
        setActiveModal(type);
    };

    const closeModal = () => {
        setActiveModal(null);
    };

    useEffect(() => {
        if (!isUserPending && !user) {
            redirect("/auth");
        }
    }, [user, isUserPending]);

    if (isUserError) {
        redirect("/auth");
    }

    return (
        <div className="flex flex-col gap-[15px]">
            <div className="flex lg:flex-wrap w-full justify-between gap-[15px]">
                <MainInfo
                    openModal={() => openModal("editUserInfo")}
                    isUserPending={isUserPending}
                    isUserError={isUserError}
                    currentUser={user}
                />
                <div className="flex flex-col gap-[15px] w-1/2 lg:w-full ">
                    <DeliveryAddress
                        isUserPending={isUserPending}
                        isUserError={isUserError}
                        currentUser={user}
                        openModal={(type: AttributeModalType) => {
                            openModal(type);
                        }}
                    />
                    <ChangePassword
                        openModal={(type: AttributeModalType) => {
                            openModal(type);
                        }}
                        isUserError={isUserError}
                        isUserPending={isUserPending}
                        currentUser={user}
                    />
                </div>
            </div>

            <DeliveryAndPaymentMethod />
            <DeleteAccount
                isUserError={isUserError}
                isUserPending={isUserPending}
                currentUser={user}
                openModal={(type: AttributeModalType) => openModal(type)}
            />

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
