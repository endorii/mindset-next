import { IUser } from "@/features/admin/user-info/types/user.types";
import { AttributeModalType } from "@/shared/types/types";
import { MonoButton } from "@/shared/ui/buttons";
import React from "react";

interface DeleteAccountProps {
    isUserError: boolean;
    isUserPending: boolean;
    currentUser: IUser | undefined;
    openModal: (type: AttributeModalType) => void;
}

function DeleteAccount({
    isUserError,
    isUserPending,
    currentUser,
    openModal,
}: DeleteAccountProps) {
    return (
        <div className="flex flex-col gap-[10px] w-full h-fit rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="font-bold">Видалити акаунт</div>
            <MonoButton
                disabled={isUserError || isUserPending || !currentUser}
                className="bg-red-500/15 border border-white/10 hover:bg-red-500/70! hover:text-white!"
                onClick={() => openModal("deleteAccount")}
            >
                Видалити акаунт
            </MonoButton>
        </div>
    );
}

export default DeleteAccount;
