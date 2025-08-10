"use client";

import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { useUserOrders } from "@/features/orders/hooks/useOrders";
import { IOrderItem } from "@/features/orders/types/orders.types";
import { AddReviewModal } from "@/features/reviews/modals";
import { BackIcon } from "@/shared/icons";
import { MonoButton } from "@/shared/ui/buttons";
import { formatDate } from "@/shared/utils/formatDate";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Orders = () => {
    const { data: userOrders } = useUserOrders();

    const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [selectedOrderItem, setSelectedOrderItem] =
        useState<IOrderItem | null>(null);

    const router = useRouter();

    const toggleExpand = (orderId: string) => {
        setExpandedOrderId((prevId) => (prevId === orderId ? null : orderId));
    };

    return (
        <div className="flex flex-col gap-[15px]">
            <div className="flex justify-between items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] xs:py-[10px]">
                <div className="text-2xl xs:text-xl font-bold">
                    Ваш список замовлень
                </div>
            </div>

            {userOrders && userOrders.length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] xs:p-[10px]">
                    <div className="border border-white/10 rounded-xl">
                        {userOrders.map((order) => {
                            const isExpanded = expandedOrderId === order.id;

                            return (
                                <div
                                    key={order.id}
                                    className="border-b border-white/10 last:border-b-0"
                                >
                                    <div className="relative flex gap-[40px] p-[20px]">
                                        <button
                                            onClick={() =>
                                                toggleExpand(order.id || "")
                                            }
                                            className={`absolute top-[20px] right-[20px] transition-transform duration-300 bg-black/60 border border-white/10 p-[5px] shadow-lg backdrop-blur-xl rounded-xl cursor-pointer ${
                                                isExpanded
                                                    ? "rotate-90"
                                                    : "rotate-270"
                                            }`}
                                        >
                                            <BackIcon className="fill-white stroke-80 stroke-white w-[20px]" />
                                        </button>

                                        <div className="flex flex-col justify-between gap-[10px]">
                                            <div>
                                                <div className="text-sm xs:text-xs text-white/40">
                                                    {formatDate(
                                                        order.createdAt || "-"
                                                    )}
                                                </div>
                                                <div className="xs:text-sm">
                                                    № {order.id?.slice(0, 12)}
                                                    ...
                                                </div>
                                            </div>

                                            <div
                                                className={`font-semibold xs:text-sm ${
                                                    order.status === "pending"
                                                        ? "text-yellow-500"
                                                        : order.status ===
                                                          "paid"
                                                        ? "text-blue-500"
                                                        : order.status ===
                                                          "shipped"
                                                        ? "text-blue-500"
                                                        : order.status ===
                                                          "delivered"
                                                        ? "text-green-500"
                                                        : "text-red-500"
                                                }`}
                                            >
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
                                        </div>

                                        <div className="flex gap-[15px] items-center lg:hidden">
                                            {order.items.length > 0 ? (
                                                <>
                                                    {order.items
                                                        .slice(0, 4)
                                                        .map((item) => (
                                                            <img
                                                                key={item.id}
                                                                src={`http://localhost:5000/${item.product?.banner}`}
                                                                className="max-h-[120px] w-full object-cover rounded"
                                                                alt="banner"
                                                            />
                                                        ))}
                                                    {order.items.length > 4 && (
                                                        <div className="flex items-center justify-center min-w-[40px] h-[120px] bg-gray-200 rounded text-black text-lg font-semibold">
                                                            +
                                                            {order.items
                                                                .length - 4}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <span>Не знайдено</span>
                                            )}
                                        </div>
                                    </div>

                                    {isExpanded && (
                                        <div className="px-[20px] pb-[20px] text-sm bg-white/3 border-t border-white/10">
                                            <div className="grid grid-cols-2 gap-[20px] py-4">
                                                <div>
                                                    <div className="text-white/60">
                                                        ID замовлення
                                                    </div>
                                                    <div className="text-white font-medium">
                                                        № {order.id}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-white/60">
                                                        Email
                                                    </div>
                                                    <div className="text-white font-medium">
                                                        {order.email || "—"}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-white/60">
                                                        Нова Пошта
                                                    </div>
                                                    <div className="text-white font-medium">
                                                        {order.area},{" "}
                                                        {order.city}, відділення{" "}
                                                        {order.postDepartment}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-white/60">
                                                        ПІБ
                                                    </div>
                                                    <div className="text-white font-medium">
                                                        {order.fullName}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-white/60">
                                                        Сума
                                                    </div>
                                                    <div className="text-white font-medium">
                                                        {order.total.toLocaleString()}{" "}
                                                        грн
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-white/60">
                                                        Телефон
                                                    </div>
                                                    <div className="text-white font-medium">
                                                        {order.phoneNumber}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="text-white/60">
                                                        Додаткова інформація
                                                    </div>
                                                    <div className="text-white font-medium">
                                                        {order.additionalInfo ||
                                                            "—"}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4">
                                                <div className="text-white/60 mb-2 font-semibold">
                                                    Товари
                                                </div>
                                                <div className="flex flex-col gap-[15px]">
                                                    {order.items.map((item) => (
                                                        <div
                                                            key={item.id}
                                                            className="grid grid-cols-[2fr_1fr_0.5fr_230px] lg:grid-cols-[2fr_1fr_1fr] sm:flex sm:flex-col gap-[20px] items-center sm:items-start border border-white/10 rounded-lg p-[10px] bg-white/5"
                                                        >
                                                            <div className="flex gap-[20px] items-center">
                                                                <img
                                                                    src={
                                                                        item
                                                                            .product
                                                                            ?.banner
                                                                            ? `http://localhost:5000/${item.product.banner}`
                                                                            : "/no-image.jpg"
                                                                    }
                                                                    alt={
                                                                        item
                                                                            .product
                                                                            ?.name ||
                                                                        "Товар"
                                                                    }
                                                                    className="object-cover rounded w-[80px] h-[80px]"
                                                                />
                                                                <div className="flex flex-col gap-[5px]">
                                                                    <div className="font-medium text-lg lg:text-base">
                                                                        {item
                                                                            .product
                                                                            ?.name ||
                                                                            "—"}
                                                                    </div>
                                                                    <div className="text-white/40 text-sm xs:text-xs">
                                                                        Колір:{" "}
                                                                        {
                                                                            item.color
                                                                        }{" "}
                                                                        |
                                                                        Розмір:{" "}
                                                                        {
                                                                            item.size
                                                                        }{" "}
                                                                        | Тип:{" "}
                                                                        {
                                                                            item.type
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="text-white text-center text-sm">
                                                                {
                                                                    item.product
                                                                        ?.price
                                                                }
                                                                .00 ₴ ×{" "}
                                                                {item.quantity}{" "}
                                                                од.
                                                            </div>

                                                            <div className="flex flex-col items-center">
                                                                <div className="text-white/50 text-xs line-through">
                                                                    {Number(
                                                                        item
                                                                            .product
                                                                            ?.oldPrice
                                                                    ) *
                                                                        Number(
                                                                            item.quantity
                                                                        )}
                                                                    .00 ₴
                                                                </div>
                                                                <div className="text-white text-base font-semibold">
                                                                    {Number(
                                                                        item
                                                                            .product
                                                                            ?.price
                                                                    ) *
                                                                        Number(
                                                                            item.quantity
                                                                        )}
                                                                    .00 ₴
                                                                </div>
                                                            </div>

                                                            <div className="flex flex-col lg:flex-row gap-[5px]">
                                                                <MonoButton
                                                                    disabled={
                                                                        order.status ===
                                                                            "pending" ||
                                                                        order.status ===
                                                                            "paid" ||
                                                                        order.status ===
                                                                            "shipped" ||
                                                                        order.status ===
                                                                            "cancelled"
                                                                    }
                                                                    className="w-full h-[40px] lg:h-[70px] py-[10px] font-semibold text-sm"
                                                                    onClick={() => {
                                                                        setActiveModal(
                                                                            true
                                                                        );
                                                                        setSelectedOrderItem(
                                                                            item
                                                                        );
                                                                    }}
                                                                >
                                                                    Залишити
                                                                    відгук
                                                                </MonoButton>
                                                                <MonoButton
                                                                    className="w-full h-[40px] lg:h-[70px] py-[10px] font-semibold text-sm"
                                                                    onClick={() =>
                                                                        router.push(
                                                                            `/${item.product?.category?.collection?.path}/${item.product?.category?.path}/${item.product?.path}`
                                                                        )
                                                                    }
                                                                >
                                                                    Повторити
                                                                    замовлення
                                                                </MonoButton>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="text-center text-white/60 p-10">
                    Замовлення відсутні
                </div>
            )}

            <AddReviewModal
                isOpen={activeModal}
                selectedOrderItem={selectedOrderItem}
                onClose={() => {
                    setActiveModal(false);
                    setSelectedOrderItem(null);
                }}
            />
        </div>
    );
};

export default Orders;
