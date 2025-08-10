import { IUser } from "@/features/shop/user-info/types/user.types";
import { AttributeModalType } from "@/shared/types/types";
import { MonoButton } from "@/shared/ui/buttons";
import InfoField from "@/shared/ui/inputs/InfoField";
import DeliveryAddressSkeleton from "@/shared/ui/skeletons/DeliveryAddressSkeleton";

interface DeliveryAddressProps {
    openModal: (type: AttributeModalType) => void;
    isUserPending: boolean;
    isUserError: boolean;
    currentUser: IUser | undefined;
}

function DeliveryAddress({
    openModal,
    isUserPending,
    isUserError,
    currentUser,
}: DeliveryAddressProps) {
    return (
        <div className="relative flex flex-col group gap-[10px] w-full rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <div className="font-bold">Адреса доставки</div>
            {!currentUser?.shippingAddress && !isUserPending ? (
                <MonoButton onClick={() => openModal("addUserAddress")}>
                    Додати адресу
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
                        className="absolute top-0 right-0 flex h-full w-full items-center justify-center rounded-xl bg-black/80 uppercase text-2xl font-light opacity-0 group-hover:opacity-100 transition-all duration-400 cursor-pointer z-10"
                        onClick={() => openModal("editUserAddress")}
                    >
                        Редагувати
                    </button>
                    <div className="grid grid-cols-2 xl:grid-cols-1 gap-[15px]">
                        <InfoField
                            label={"Одержувач (ПІБ)"}
                            value={currentUser?.shippingAddress?.recipient}
                        />
                        <InfoField
                            label={"Країна проживання, область"}
                            value={`${currentUser?.shippingAddress?.country}, ${currentUser?.shippingAddress?.region} обл.`}
                        />
                        <InfoField
                            label={"Місто, вулиця, будинок, квартира"}
                            value={`${currentUser?.shippingAddress?.city}, вул.${currentUser?.shippingAddress?.street}, ${currentUser?.shippingAddress?.building}. ${currentUser?.shippingAddress?.apartment}`}
                        />
                        <InfoField
                            label={"Поштовий індекс"}
                            value={currentUser?.shippingAddress?.postalCode}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default DeliveryAddress;
