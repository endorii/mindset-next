"use client";

import { EditIcon, InfoIcon, TrashIcon } from "@/shared/icons";
import { OrderModalType } from "@/shared/types/types";
import { ButtonWithIcon, DeleteButtonWithIcon } from "@/shared/ui/buttons";

import { FilterSection } from "@/features/admin/attributes/components/FilterSection";
import { FiltersWrapper } from "@/shared/components/layout";
import { formatDate } from "@/shared/utils/formatDate";
import { useMemo, useState } from "react";
import { useOrders } from "../hooks/useOrders";
import { DeleteOrderModal, EditOrderModal, OrderInfoModal } from "../modals";
import { IOrder } from "../types/orders.types";

export function AdminOrdersContent() {
    const sortFilters = [
        "Newer First",
        "Older First",
        "Amount, $ (high)",
        "Amount, $ (low)",
    ];
    const statusFilters = [
        "Processing",
        "Paid",
        "Shipped",
        "Delivered",
        "Cancelled",
    ];

    const [activeModal, setActiveModal] = useState<OrderModalType>(null);
    const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
    const [selectedSortFilter, setSelectedSortFilter] = useState("");
    const [selectedStatusFilter, setSelectedStatusFilter] = useState("");

    const { data: orders } = useOrders();

    const filteredAndSortedOrders = useMemo(() => {
        if (!orders) return [];

        let result = [...orders];

        if (selectedStatusFilter) {
            result = result.filter((order) => {
                const statusMap = {
                    pending: "Processing",
                    paid: "Paid",
                    shipped: "Shipped",
                    delivered: "Delivered",
                    cancelled: "Cancelled",
                };
                return statusMap[order.status] === selectedStatusFilter;
            });
        }

        switch (selectedSortFilter) {
            case "Newer First":
                return result.sort(
                    (a, b) =>
                        new Date(b.createdAt || "").getTime() -
                        new Date(a.createdAt || "").getTime()
                );
            case "Older First":
                return result.sort(
                    (a, b) =>
                        new Date(a.createdAt || "").getTime() -
                        new Date(b.createdAt || "").getTime()
                );
            case "Amount, $ (high)":
                return result.sort((a, b) => b.total - a.total);
            case "Amount, $ (low)":
                return result.sort((a, b) => a.total - b.total);
            default:
                return result;
        }
    }, [orders, selectedSortFilter, selectedStatusFilter]);

    const resetFilters = () => {
        setSelectedSortFilter("");
        setSelectedStatusFilter("");
    };

    const openModal = (type: OrderModalType, order: IOrder | null) => {
        setSelectedOrder(order);
        setActiveModal(type);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setActiveModal(null);
    };

    return (
        <>
            {orders && orders.length > 0 ? (
                <div className="flex flex-col gap-[10px] bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] sm:px-[10px]">
                    <FiltersWrapper resetFilters={resetFilters}>
                        <FilterSection
                            title="Filter by time"
                            filters={sortFilters}
                            selectedItem={selectedSortFilter}
                            onFilterClick={setSelectedSortFilter}
                        />

                        <FilterSection
                            title="Filter by status"
                            filters={statusFilters}
                            selectedItem={selectedStatusFilter}
                            onFilterClick={setSelectedStatusFilter}
                        />
                    </FiltersWrapper>
                    <div
                        className="grid 
                    grid-cols-[1.5fr_1fr_1fr_1fr_1.5fr_230px] 
                    lg:grid-cols-4
                    md:grid-cols-3
                    xs:grid-cols-2 
                    gap-[15px] p-[20px] sm:p-[10px] rounded-t-lg font-semibold text-sm"
                    >
                        <div>Name</div>
                        <div className="lg:hidden">Phone number</div>
                        <div className="xs:text-end">Visibility</div>
                        <div className="text-center md:hidden">Ammount, $</div>
                        <div className="xs:hidden">Creation/Update Date</div>
                        <div className="text-right lg:hidden">Actions</div>
                    </div>
                    <div className="border border-white/5  ">
                        {filteredAndSortedOrders?.map((order) => (
                            <div
                                key={order.id}
                                className="flex flex-col gap-[25px] p-[20px] border-b border-white/5 last:border-b-0 text-sm"
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
                                                pending: "Processing",
                                                paid: "Paid",
                                                shipped: "Shipped",
                                                delivered: "Delivered",
                                                cancelled: "Cancelled",
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
                <div className="relative flex min-h-[200px] items-center bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] overflow-hidden">
                    <div className="font-bold text-3xl z-1">
                        The order list is empty.
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
        </>
    );
}
