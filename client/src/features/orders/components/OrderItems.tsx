"use client";

import { MonoButton } from "@/shared/ui/buttons";
import { useRouter } from "next/navigation";
import { IOrder, IOrderItem } from "../types/orders.types";

export function OrderItems({
    items,
    order,
    setActiveModal,
    setSelectedOrderItem,
}: {
    items: IOrderItem[];
    order: IOrder;
    setActiveModal: (open: boolean) => void;
    setSelectedOrderItem: (i: IOrderItem) => void;
}) {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-[10px]">
            {items.map((item) => {
                const hasOldPrice =
                    typeof item.product?.oldPrice === "number" &&
                    item.product.oldPrice > 0;

                const total =
                    Number(item.product?.price) * Number(item.quantity);
                const totalOld = hasOldPrice
                    ? Number(item.product?.oldPrice) * Number(item.quantity)
                    : null;

                return (
                    <div
                        key={item.id}
                        className="grid grid-cols-[2fr_1fr_0.5fr_230px] lg:grid-cols-[2fr_1fr_1fr] sm:flex sm:flex-col gap-[20px] items-center sm:items-start border border-white/5 p-[10px] bg-white/5"
                    >
                        <div className="flex gap-[20px] items-center">
                            <img
                                src={item.product?.banner || "/no-image.jpg"}
                                alt={item.product?.name || "Product"}
                                className="object-cover w-[80px] h-[80px]"
                            />
                            <div className="flex flex-col gap-[5px]">
                                <div className="font-perandory tracking-wider text-3xl lg:text-base">
                                    {item.product?.name || "—"}
                                </div>
                                <div className="font-perandory tracking-wider text-base xs:text-sm text-neutral-400">
                                    Color: {item.color} | Size: {item.size} |
                                    Type: {item.type}
                                </div>
                            </div>
                        </div>

                        <div className="text-white text-center text-sm">
                            ${item.product?.price}.00 × {item.quantity}
                        </div>

                        <div className="flex flex-col items-center">
                            {hasOldPrice && (
                                <div className="text-neutral-400 text-xs line-through">
                                    ${totalOld}.00
                                </div>
                            )}
                            <div className="text-white text-base font-semibold">
                                ${total}.00
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-[5px]">
                            <MonoButton
                                disabled={[
                                    "pending",
                                    "paid",
                                    "shipped",
                                    "cancelled",
                                ].includes(order.status)}
                                className="w-full h-[40px] lg:h-[70px] py-[10px] font-semibold text-sm"
                                onClick={() => {
                                    setActiveModal(true);
                                    setSelectedOrderItem(item);
                                }}
                            >
                                Leave a review
                            </MonoButton>

                            <MonoButton
                                className="w-full h-[40px] lg:h-[70px] py-[10px] font-semibold text-sm"
                                onClick={() =>
                                    router.push(
                                        `/${item.product?.category?.collection?.path}/${item.product?.category?.path}/${item.product?.path}`
                                    )
                                }
                            >
                                View product
                            </MonoButton>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
