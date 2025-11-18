import { IUser } from "@/features/shop/user-info/types/user.types";
import { AttributeModalType } from "@/shared/types/types";
import { MonoButton } from "@/shared/ui/buttons";
import { InfoField } from "@/shared/ui/inputs/InfoField";
import { DeliveryAddressSkeleton } from "@/shared/ui/skeletons";

interface DeliveryAddressProps {
    openModal: (type: AttributeModalType) => void;
    isUserPending: boolean;
    isUserError: boolean;
    currentUser: IUser | null | undefined;
}

export function DeliveryAddress({
    openModal,
    isUserPending,
    isUserError,
    currentUser,
}: DeliveryAddressProps) {
    return (
        <div className="relative flex flex-col group gap-[10px] w-full bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="text-3xl font-perandory tracking-wider">
                Personal delivery address (optional)
            </div>
            {!currentUser?.shippingAddress && !isUserPending ? (
                <MonoButton onClick={() => openModal("addUserAddress")}>
                    Add address
                </MonoButton>
            ) : isUserPending ? (
                <DeliveryAddressSkeleton />
            ) : isUserError ? (
                <div className="text-red-500">
                    Помилка при завантаженні користувача.
                </div>
            ) : (
                <div className=" py-[10px] flex flex-col gap-[7px] h-full">
                    <button
                        className="absolute flex gap-[5px] items-center top-[20px] right-[20px]"
                        onClick={() => openModal("editUserAddress")}
                    >
                        <div className="font-perandory tracking-wider text-xl border-b border-transparent hover:border-white">
                            Edit
                        </div>
                    </button>
                    <div className="grid grid-cols-2 xl:grid-cols-1 gap-[15px]">
                        <InfoField
                            label={"Recepient (Full name)"}
                            value={currentUser?.shippingAddress?.recipient}
                        />
                        <InfoField
                            label={"Country of residence, region"}
                            value={`${currentUser?.shippingAddress?.country}, ${currentUser?.shippingAddress?.region} reg.`}
                        />
                        <InfoField
                            label={"City, street, house, apartment"}
                            value={`${currentUser?.shippingAddress?.city}, ${currentUser?.shippingAddress?.street} str., ${currentUser?.shippingAddress?.building}. ${currentUser?.shippingAddress?.apartment}`}
                        />
                        <InfoField
                            label={"Postal code"}
                            value={currentUser?.shippingAddress?.postalCode}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
