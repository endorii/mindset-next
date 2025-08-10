import { IUser } from "@/features/shop/user-info/types/user.types";
import InfoField from "@/shared/ui/inputs/InfoField";
import MainInfoSkeleton from "@/shared/ui/skeletons/MainInfoSkeleton";

interface MainInfoProps {
    openModal: () => void;
    isUserPending: boolean;
    isUserError: boolean;
    currentUser: IUser | undefined;
}

function MainInfo({
    openModal,
    isUserPending,
    isUserError,
    currentUser,
}: MainInfoProps) {
    return (
        <div className="relative flex flex-col group gap-[10px] w-1/2 lg:w-full rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
            <button
                className="absolute top-0 right-0 flex h-full w-full items-center justify-center rounded-xl bg-black/80 uppercase text-2xl font-light opacity-0 group-hover:opacity-100 transition-all duration-400 cursor-pointer z-10"
                onClick={openModal}
            >
                Редагувати
            </button>
            <div className="font-bold text-xl">Основна інформація</div>
            {isUserPending ? (
                <MainInfoSkeleton />
            ) : isUserError ? (
                <div className="text-red-500">
                    Помилка при завантаженні користувача.
                </div>
            ) : (
                <div className="flex w-full">
                    <div className="flex flex-col py-[10px] gap-[15px] w-full">
                        <InfoField
                            label={"Відображуване ім'я"}
                            value={currentUser?.name}
                        />
                        <InfoField
                            label={"Номер телефону"}
                            value={currentUser?.phone}
                        />
                        <InfoField
                            label={"Електронна пошта"}
                            value={currentUser?.email}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default MainInfo;
