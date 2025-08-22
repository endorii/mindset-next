"use client";

import { FilterSection } from "@/features/admin/attributes/components/FilterSection";
import Title from "@/features/admin/attributes/components/Title";
import { useOrders } from "@/features/orders/hooks/useOrders";
import {
    DeleteOrderModal,
    EditOrderModal,
    OrderInfoModal,
} from "@/features/orders/modals";
import { IOrder } from "@/features/orders/types/orders.types";
import { InfoIcon, EditIcon, TrashIcon } from "@/shared/icons";
import { OrderModalType } from "@/shared/types/types";
import { ButtonWithIcon, DeleteButtonWithIcon } from "@/shared/ui/buttons";
import { ErrorWithMessage } from "@/shared/ui/components";
import {
    AdminProductsSkeleton,
    FilterSectionSkeleton,
    TitleWithButtonSkeleton,
} from "@/shared/ui/skeletons";
import { formatDate } from "@/shared/utils/formatDate";
import { useState } from "react";

function Orders() {
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

    const {
        data: orders,
        isPending: isOrdersPending,
        isError: isOrdersError,
        error: ordersError,
    } = useOrders();

    if (isOrdersPending) {
        return (
            <div className="flex flex-col gap-[15px]">
                <TitleWithButtonSkeleton />
                <FilterSectionSkeleton />
                <FilterSectionSkeleton />
                <AdminProductsSkeleton />
            </div>
        );
    }

    if (isOrdersError) {
        return (
            <>
                <Title title="Список замовлень" />
                <ErrorWithMessage message="Невідома помилка отримання замовлень" />
            </>
        );
    }

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
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[10px] pt-0">
                    <div
                        className="grid 
                    grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr_230px] 
                    lg:grid-cols-4
                    md:grid-cols-3
                    xs:grid-cols-2 
                    gap-[15px] p-[20px] sm:p-[10px] rounded-t-lg font-semibold text-sm"
                    >
                        <div>Ім'я</div>
                        <div className="lg:hidden">Телефон</div>
                        <div className="xs:text-end">Статус</div>
                        <div className="text-center md:hidden">Сума, грн</div>
                        <div className="xs:hidden">
                            Дата створення / оновлення
                        </div>
                        <div className="text-right lg:hidden">Дії</div>
                    </div>
                    <div className="border border-white/10 rounded-xl">
                        {orders?.map((order) => (
                            <div
                                key={order.id}
                                className="flex flex-col gap-[25px] p-[20px] border-b border-white/10 last:border-b-0 text-sm"
                            >
                                <div
                                    className="grid 
                                grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr_230px] 
                                lg:grid-cols-4 
                                md:grid-cols-3 
                                xs:grid-cols-2 
                                gap-[15px] items-center"
                                >
                                    <div>{order.fullName}</div>
                                    <div className="lg:hidden">
                                        {order.phoneNumber}
                                    </div>
                                    <div className="xs:text-end">
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
                                    <div className="text-center md:hidden">
                                        {order.total.toLocaleString()}
                                    </div>
                                    <div className="xs:hidden">
                                        {formatDate(order.createdAt || "")} /{" "}
                                        {formatDate(order.updatedAt || "")}
                                    </div>
                                    <div className="flex gap-[10px] md:gap-[5px] justify-end lg:hidden">
                                        <ButtonWithIcon
                                            onClick={() => {
                                                openModal("infoOrder", order);
                                            }}
                                        >
                                            <InfoIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-none stroke-white stroke-2 group-hover:stroke-black" />
                                        </ButtonWithIcon>
                                        <ButtonWithIcon
                                            onClick={() => {
                                                openModal("editOrder", order);
                                            }}
                                        >
                                            <EditIcon className="w-[26px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                        </ButtonWithIcon>
                                        <DeleteButtonWithIcon
                                            onClick={() => {
                                                openModal("deleteOrder", order);
                                            }}
                                        >
                                            <TrashIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-[1.7] fill-none" />
                                        </DeleteButtonWithIcon>
                                    </div>
                                </div>
                                <div className="gap-[10px] hidden lg:flex w-full">
                                    <ButtonWithIcon
                                        className="w-full"
                                        onClick={() => {
                                            openModal("infoOrder", order);
                                        }}
                                    >
                                        <InfoIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] fill-none stroke-white stroke-2 group-hover:stroke-black" />
                                    </ButtonWithIcon>
                                    <ButtonWithIcon
                                        className="w-full"
                                        onClick={() => {
                                            openModal("editOrder", order);
                                        }}
                                    >
                                        <EditIcon className="w-[26px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </ButtonWithIcon>
                                    <DeleteButtonWithIcon
                                        className="w-full flex justify-center"
                                        onClick={() => {
                                            openModal("deleteOrder", order);
                                        }}
                                    >
                                        <TrashIcon className="w-[30px] lg:w-[25px] md:w-[20px] xs:w-[18px] stroke-white stroke-[1.7] fill-none" />
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
