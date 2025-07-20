"use client";

import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { useOrders, useUserOrders } from "@/features/orders/hooks/useOrders";
import { InfoIcon, EditIcon, TrashIcon } from "@/shared/icons";
import ButtonWithIcon from "@/shared/ui/buttons/ButtonWithIcon";
import ChooseButton from "@/shared/ui/buttons/ChooseButton";
import DeleteButtonWithIcon from "@/shared/ui/buttons/DeleteButtonWithIcon";
import { formatDate } from "@/shared/utils/formatDate";

const Orders = () => {
    const { data: user } = useCurrentUser();
    const { data: userOrders } = useUserOrders(user?.id || "");

    return (
        <div className="flex flex-col gap-[15px]">
            <div className="flex gap-[15px] justify-between items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="text-2xl font-bold">Ваш список замовлень</div>
            </div>

            {userOrders && userOrders.length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] gap-[20px] p-4 rounded-t-lg font-semibold text-sm">
                        <div>Ім'я</div>
                        <div>Телефон</div>
                        <div>Статус</div>
                        <div>Сума, грн</div>
                        <div>Дата створення</div>
                        <div className="text-right">Дії</div>
                    </div>
                    <div className="border border-white/10 rounded-xl">
                        {userOrders?.map((order) => (
                            <div
                                key={order.id}
                                className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr] gap-[20px] p-4 border-b border-white/10 last:border-b-0 items-center"
                            >
                                <div>{order.fullName}</div>
                                <div>{order.phoneNumber}</div>
                                <div>
                                    {
                                        {
                                            pending: "Обробляється",
                                            paid: "Оплачено",
                                            shipped: "Відправлено",
                                            delivered: "Доставлено",
                                            canceled: "Відмінено",
                                        }[order.status]
                                    }
                                </div>
                                <div className="">
                                    {order.total.toLocaleString()}
                                </div>
                                <div>{formatDate(order.createdAt || "")}</div>
                                <div className="flex gap-[10px] justify-end">
                                    <ButtonWithIcon onClick={() => {}}>
                                        <InfoIcon className="w-[30px] fill-none stroke-white stroke-2 group-hover:stroke-black" />
                                    </ButtonWithIcon>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>Замовлення відсутні</div>
            )}
        </div>
    );
};

export default Orders;
