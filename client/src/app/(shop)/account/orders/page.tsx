"use client";

import { UserOrdersList } from "@/features/orders/components/UserOrdersList";
import { useUserOrders } from "@/features/orders/hooks/useOrders";
import { IOrderItem } from "@/features/orders/types/orders.types";
import { AddReviewModal } from "@/features/reviews/modals";
import { ErrorWithMessage } from "@/shared/ui/components";
import { UserOrdersSkeleton } from "@/shared/ui/skeletons";
import { useState } from "react";

const Orders = () => {
    const {
        data: userOrders,
        isPending: isUserOrdersPending,
        isError: isUserOrdersError,
    } = useUserOrders();

    const [activeModal, setActiveModal] = useState<boolean>(false);
    const [selectedOrderItem, setSelectedOrderItem] =
        useState<IOrderItem | null>(null);

    if (!userOrders && isUserOrdersPending) return <UserOrdersSkeleton />;
    if (isUserOrdersError)
        return (
            <ErrorWithMessage message="An error occurred while loading orders... Please refresh the page or try again later." />
        );
    if (!userOrders || userOrders.length === 0) return;
    <div className="text-center text-neutral-200 p-[20px]">
        Orders list empty
    </div>;

    return (
        <div className="flex flex-col gap-[10px]">
            <div className="flex flex-col bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] xs:py-[10px]">
                <div className="text-3xl xs:text-xl font-perandory tracking-wider">
                    Your orders list
                </div>
                <UserOrdersList
                    userOrders={userOrders}
                    setActiveModal={setActiveModal}
                    setSelectedOrderItem={setSelectedOrderItem}
                />
                <AddReviewModal
                    isOpen={activeModal}
                    selectedOrderItem={selectedOrderItem}
                    onClose={() => {
                        setActiveModal(false);
                        setSelectedOrderItem(null);
                    }}
                />
            </div>
        </div>
    );
};

export default Orders;
