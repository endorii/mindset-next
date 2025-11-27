"use client";

import { BackIcon } from "@/shared/icons";
import { formatDate } from "@/shared/utils/formatDate";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IOrder, IOrderItem } from "../types/orders.types";
import { Detail } from "./Detail";
import { OrderItems } from "./OrderItems";

const statusMap: Record<string, { label: string; className: string }> = {
    pending: { label: "Pending", className: "text-yellow-500" },
    paid: { label: "Paid", className: "text-blue-500" },
    shipped: { label: "Send", className: "text-blue-500" },
    delivered: { label: "Delivered", className: "text-green-500" },
    cancelled: { label: "Cancelled", className: "text-red-500" },
};

export function UserOrdersList({
    userOrders,
    setActiveModal,
    setSelectedOrderItem,
}: {
    userOrders: IOrder[];
    setActiveModal: (open: boolean) => void;
    setSelectedOrderItem: (item: IOrderItem) => void;
}) {
    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
    const router = useRouter();

    const toggleExpand = (orderId: string) =>
        setExpandedOrderId((prev) => (prev === orderId ? null : orderId));

    if (!userOrders?.length) return null;

    return (
        <div className="border border-white/5 mt-[20px]">
            {userOrders.map((order) => {
                const isExpanded = expandedOrderId === order.id;
                const status = statusMap[order.status];

                return (
                    <div
                        key={order.id}
                        className="border-b border-white/5 last:border-b-0"
                    >
                        <div className="relative flex gap-[40px] p-[20px]">
                            <button
                                onClick={() => toggleExpand(order.id)}
                                className={`absolute top-[20px] right-[20px] transition-transform duration-300 bg-black/60 border border-white/5 p-[5px] shadow-lg backdrop-blur-xl cursor-pointer ${
                                    isExpanded ? "rotate-90" : "rotate-270"
                                }`}
                            >
                                <BackIcon className="fill-white stroke-80 stroke-white w-[20px]" />
                            </button>

                            <div className="flex flex-col justify-between gap-[10px]">
                                <div className="flex flex-col gap-[3px]">
                                    <div className="text-xs text-neutral-400">
                                        {formatDate(order.createdAt || "-")}
                                    </div>
                                    <div className="xs:text-sm">
                                        № {order.id?.slice(0, 12)}...
                                    </div>
                                </div>

                                <div
                                    className={`font-semibold text-lg xs:text-md font-perandory tracking-widest  ${status.className}`}
                                >
                                    {status.label}
                                </div>
                            </div>

                            <div className="flex gap-[15px] items-center sm:hidden">
                                {order.items.slice(0, 3).map((i) => (
                                    <img
                                        key={i.id}
                                        src={i.product?.banner}
                                        className="max-h-[120px] w-full object-cover"
                                    />
                                ))}
                                {order.items.length > 3 && (
                                    <div className="flex items-center justify-center min-w-[40px] h-[120px] bg-gray-200 text-black text-lg font-semibold">
                                        +{order.items.length - 3}
                                    </div>
                                )}
                            </div>
                        </div>

                        {isExpanded && (
                            <div className="px-[20px] pb-[20px] text-sm bg-white/3 border-t border-white/5">
                                <div className="grid grid-cols-2 gap-[20px] py-4">
                                    <Detail
                                        label="Order ID"
                                        value={`№ ${order.id}`}
                                    />
                                    <Detail
                                        label="E-mail"
                                        value={order.email || "—"}
                                    />
                                    <Detail
                                        label="Delivery address"
                                        value={`${order.area}, ${order.city}, branch ${order.postDepartment}`}
                                    />
                                    <Detail
                                        label="Full name"
                                        value={order.fullName}
                                    />
                                    <Detail
                                        label="Amount"
                                        value={`$${order.total.toLocaleString()}`}
                                    />
                                    <Detail
                                        label="Phone number"
                                        value={order.phoneNumber}
                                    />
                                </div>

                                <div className="mt-4">
                                    <div className="text-neutral-400 mb-2 font-semibold">
                                        Products
                                    </div>
                                    <OrderItems
                                        items={order.items}
                                        order={order}
                                        setActiveModal={setActiveModal}
                                        setSelectedOrderItem={
                                            setSelectedOrderItem
                                        }
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
