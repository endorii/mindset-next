"use client";

import AddCategoryModal from "@/features/categories/modals/AddCategoryModal";
import { useOrders } from "@/features/orders/hooks/useOrders";
import DeleteOrderModal from "@/features/orders/modals/DeleteOrderModal";
import EditOrderModal from "@/features/orders/modals/EditOrderModal";
import OrderInfoModal from "@/features/orders/modals/OrderInfoModal";
import { IOrder } from "@/features/orders/types/orders.types";
import { InfoIcon, EditIcon, TrashIcon } from "@/shared/icons";
import { OrderModalType } from "@/shared/types/types";
import ButtonWithIcon from "@/shared/ui/buttons/ButtonWithIcon";
import ChooseButton from "@/shared/ui/buttons/ChooseButton";
import DeleteButtonWithIcon from "@/shared/ui/buttons/DeleteButtonWithIcon";
import { formatDate } from "@/shared/utils/formatDate";
import { data } from "motion/react-client";
import { useState } from "react";

function page() {
    const { data: orders } = useOrders();

    const sortFilters = ["Спочатку новіші", "Спочатку старіші"];
    const statusFilters = [
        "Обробляється",
        "Оплачено",
        "Відправлено",
        "Доставлено",
        "Відмінено",
    ];

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
                <div className="text-2xl font-bold">Список замовлень:</div>
            </div>

            <div className="flex items-center gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[20px] py-[10px]">
                <div className="font-semibold">Фільтрувати за часом:</div>
                <ul className="flex gap-[10px]">
                    {sortFilters.map((name, i) => (
                        <li key={i}>
                            <ChooseButton
                                onClick={function (): void {
                                    throw new Error(
                                        "Function not implemented."
                                    );
                                }}
                            >
                                {name}
                            </ChooseButton>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[20px] py-[10px]">
                <div className="font-semibold">Фільтрувати з статусом:</div>
                <ul className="flex gap-[10px]">
                    {statusFilters.map((name, i) => (
                        <li key={i}>
                            <ChooseButton
                                onClick={function (): void {
                                    throw new Error(
                                        "Function not implemented."
                                    );
                                }}
                            >
                                {name}
                            </ChooseButton>
                        </li>
                    ))}
                </ul>
            </div>
            {orders && orders.length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_2fr_230px] gap-[20px] p-4 rounded-t-lg font-semibold text-sm">
                        <div>Ім'я</div>
                        <div>Телефон</div>
                        <div>Статус</div>
                        <div>Сума, грн</div>
                        <div>Дата створення / оновлення</div>
                        <div className="text-right">Дії</div>
                    </div>
                    <div className="border border-white/10 rounded-xl">
                        {orders?.map((order) => (
                            <div
                                key={order.id}
                                className="grid grid-cols-[1.5fr_1fr_1fr_1fr_2fr_230px] gap-[20px] p-4 border-b border-white/10 last:border-b-0 items-center"
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
                                <div>{order.total.toLocaleString()}</div>
                                <div>
                                    {formatDate(order.createdAt || "")} /{" "}
                                    {formatDate(order.updatedAt || "")}
                                </div>
                                <div className="flex gap-[10px] justify-end">
                                    <ButtonWithIcon
                                        onClick={() => {
                                            openModal("infoOrder", order);
                                        }}
                                    >
                                        <InfoIcon className="w-[30px] fill-none stroke-white stroke-2 group-hover:stroke-black" />
                                    </ButtonWithIcon>
                                    <ButtonWithIcon
                                        onClick={() => {
                                            openModal("editOrder", order);
                                        }}
                                    >
                                        <EditIcon className="w-[26px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </ButtonWithIcon>
                                    <DeleteButtonWithIcon
                                        onClick={() => {
                                            openModal("deleteOrder", order);
                                        }}
                                    >
                                        <TrashIcon className="w-[30px] stroke-white stroke-[1.7] fill-none" />
                                    </DeleteButtonWithIcon>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>Замовлення відсутні</div>
            )}

            {selectedOrder && (
                <>
                    <OrderInfoModal
                        isOpen={activeModal === "infoOrder"}
                        onClose={closeModal}
                        order={selectedOrder}
                    />
                    <EditOrderModal
                        isOpen={activeModal === "editOrder"}
                        onClose={closeModal}
                        order={selectedOrder}
                    />
                    <DeleteOrderModal
                        isOpen={activeModal === "deleteOrder"}
                        onClose={closeModal}
                        order={selectedOrder}
                    />
                </>
            )}
        </div>
    );
}

export default page;
