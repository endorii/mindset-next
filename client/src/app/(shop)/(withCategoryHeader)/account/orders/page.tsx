"use client";

import { useCurrentUser } from "@/features/admin/user-info/hooks/useUsers";
import { useUserOrders } from "@/features/orders/hooks/useOrders";
import OrderInfoModal from "@/features/orders/modals/OrderInfoModal";
import { IOrder } from "@/features/orders/types/orders.types";
import { InfoIcon } from "@/shared/icons";
import { OrderModalType } from "@/shared/types/types";
import ButtonWithIcon from "@/shared/ui/buttons/ButtonWithIcon";
import { formatDate } from "@/shared/utils/formatDate";
import { useState } from "react";

const Orders = () => {
    const { data: user } = useCurrentUser();
    const { data: userOrders } = useUserOrders(user?.id || "");

    const [activeModal, setActiveModal] = useState<OrderModalType>(null);
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

    const openModal = (type: OrderModalType, order: IOrder | null) => {
        setSelectedOrder(order);
        setActiveModal(type);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setActiveModal(null);
    };

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
                                            cancelled: "Відмінено",
                                        }[order.status]
                                    }
                                </div>
                                <div className="">
                                    {order.total.toLocaleString()}
                                </div>
                                <div>{formatDate(order.createdAt || "")}</div>
                                <div className="flex gap-[10px] justify-end">
                                    <ButtonWithIcon
                                        onClick={() =>
                                            openModal("infoUserOrder", order)
                                        }
                                    >
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
            {selectedOrder && (
                <OrderInfoModal
                    isOpen={activeModal === "infoUserOrder"}
                    onClose={closeModal}
                    order={selectedOrder}
                />
            )}
        </div>
    );
};

export default Orders;
