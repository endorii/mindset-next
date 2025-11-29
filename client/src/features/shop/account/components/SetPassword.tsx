import { IUser } from "@/features/shop/user-info/types/user.types";
import { AttributeModalType } from "@/shared/types/types";
import { MonoButton } from "@/shared/ui/buttons";

interface ChangePasswordProps {
    isUserError: boolean;
    isUserPending: boolean;
    currentUser: IUser | null | undefined;
    openModal: (type: AttributeModalType) => void;
}

export function SetPassword({
    isUserError,
    isUserPending,
    currentUser,
    openModal,
}: ChangePasswordProps) {
    return (
        <div className="flex flex-col gap-[10px] w-full bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="font-perandory tracking-wider text-3xl">
                Set password
            </div>
            <MonoButton
                onClick={() => openModal("setPassword")}
                disabled={isUserError || isUserPending || !currentUser}
            >
                Set password
            </MonoButton>
        </div>
    );
}
