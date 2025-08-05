"use client";

import { FilterSection } from "@/features/admin/attributes/components/FilterSection";
import Title from "@/features/admin/attributes/components/Title";
import { useOrders } from "@/features/orders/hooks/useOrders";
import DeleteOrderModal from "@/features/orders/modals/DeleteOrderModal";
import EditOrderModal from "@/features/orders/modals/EditOrderModal";
import OrderInfoModal from "@/features/orders/modals/OrderInfoModal";
import { IOrder } from "@/features/orders/types/orders.types";
import { InfoIcon, EditIcon, TrashIcon } from "@/shared/icons";
import { OrderModalType } from "@/shared/types/types";
import { ButtonWithIcon, DeleteButtonWithIcon } from "@/shared/ui/buttons";
import { formatDate } from "@/shared/utils/formatDate";
import { useState } from "react";

function Orders() {
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
            <Title title="Список замовлень" />

            <FilterSection
                title={"Фільтрувати за часом"}
                filters={sortFilters}
                onFilterClick={function (filter: string): void {
                    throw new Error("Function not implemented.");
                }}
                selectedItem={""}
            />
            <FilterSection
                title={"Фільтрувати за статусом"}
                filters={statusFilters}
                onFilterClick={function (filter: string): void {
                    throw new Error("Function not implemented.");
                }}
                selectedItem={""}
            />

            {orders && orders.length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_2fr_230px] gap-[15px] p-4 rounded-t-lg font-semibold text-sm">
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
                                className="grid grid-cols-[1.5fr_1fr_1fr_1fr_2fr_230px] gap-[15px] p-4 border-b border-white/10 last:border-b-0 items-center"
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
                <div className="relative flex min-h-[200px] items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] overflow-hidden">
                    <div className="font-bold text-3xl z-1">
                        Список замовлень порожній
                    </div>
                    {/* <OrderIcon className="absolute fill-none stroke-2 stroke-black top-[-60] right-20 w-[400px] rotate-20 opacity-20 pointer-events-none" /> ЗАМІНИТИ */}
                </div>
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

export default Orders;
