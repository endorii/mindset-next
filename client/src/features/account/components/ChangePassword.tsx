import { IUser } from "@/features/admin/user-info/types/user.types";
import { AttributeModalType } from "@/shared/types/types";
import { MonoButton } from "@/shared/ui/buttons";

interface ChangePasswordProps {
    isUserError: boolean;
    isUserPending: boolean;
    currentUser: IUser | undefined;
    openModal: (type: AttributeModalType) => void;
}

function ChangePassword({
    isUserError,
    isUserPending,
    currentUser,
    openModal,
}: ChangePasswordProps) {
    return (
        <div className="flex flex-col gap-[10px] w-full rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="font-bold">Зміна паролю</div>
            <MonoButton
                onClick={() => openModal("changePassword")}
                disabled={isUserError || isUserPending || !currentUser}
            >
                Змінити пароль
            </MonoButton>
        </div>
    );
}

export default ChangePassword;
