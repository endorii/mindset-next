import { IUser } from "@/features/shop/user-info/types/user.types";
import { AttributeModalType } from "@/shared/types/types";
import { MonoButton } from "@/shared/ui/buttons";

interface DeleteAccountProps {
    isUserError: boolean;
    isUserPending: boolean;
    currentUser: IUser | null | undefined;
    openModal: (type: AttributeModalType) => void;
}

export function DeleteAccount({
    isUserError,
    isUserPending,
    currentUser,
    openModal,
}: DeleteAccountProps) {
    return (
        <div className="flex flex-col gap-[10px] w-full h-fit bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="font-perandory tracking-wider text-3xl">
                Delete account
            </div>
            <MonoButton
                disabled={isUserError || isUserPending || !currentUser}
                className="bg-red-500/15 border border-white/5 hover:bg-red-500/70! hover:text-white!"
                onClick={() => openModal("deleteAccount")}
            >
                Delete account
            </MonoButton>
        </div>
    );
}
