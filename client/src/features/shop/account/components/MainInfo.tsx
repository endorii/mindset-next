import { IUser } from "@/features/shop/user-info/types/user.types";
import { InfoField } from "@/shared/ui/components";
import { MainInfoSkeleton } from "@/shared/ui/skeletons";

interface MainInfoProps {
    openModal: () => void;
    isUserPending: boolean;
    isUserError: boolean;
    currentUser: IUser | null | undefined;
}

export function MainInfo({
    openModal,
    isUserPending,
    isUserError,
    currentUser,
}: MainInfoProps) {
    return (
        <div className="relative flex flex-col group gap-[10px] w-1/2 lg:w-full bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <button
                className="absolute flex gap-[5px] items-center top-[20px] right-[20px]"
                onClick={openModal}
            >
                <div className="font-perandory tracking-wider text-xl border-b border-transparent hover:border-white">
                    Edit
                </div>
            </button>
            <div className="font-perandory tracking-wider text-3xl">
                Main info
            </div>
            {isUserPending ? (
                <MainInfoSkeleton />
            ) : isUserError ? (
                <div className="text-red-500">Error loading user.</div>
            ) : (
                <div className="flex w-full">
                    <div className="flex flex-col py-[10px] gap-[15px] w-full">
                        <InfoField
                            label={"Username"}
                            value={currentUser?.userName}
                        />
                        <InfoField
                            label={"Phone number"}
                            value={currentUser?.phone || "-"}
                        />
                        <InfoField
                            label={"E-mail"}
                            value={currentUser?.email}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
