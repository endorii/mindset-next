"use client";

import { useOrderByStripeSessionId } from "@/features/orders/hooks/useOrders";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { CheckIcon } from "@/shared/icons";
import { MonoButtonUnderlined } from "@/shared/ui/buttons/MonoButtonUnderlined";
import { useRouter, useSearchParams } from "next/navigation";

const OrderSuccessPage = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const router = useRouter();

    const { data: user, isPending: isUserPending } = useCurrentUser();

    if (!sessionId) {
        return (
            <div className="min-h-screen flex text-white items-center justify-center">
                <div className="flex flex-col items-center gap-[15px] bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px] max-w-xl text-center">
                    <div className="flex flex-col gap-[20px] items-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-800 rounded-full">
                            <CheckIcon className="w-[50px] fill-none stroke-white stroke-2" />
                        </div>
                        <div className="text-5xl font-perandory tracking-wider">
                            Payment session not found
                        </div>
                    </div>
                    <p className="text-neutral-400 font-light">
                        We were unable to retrieve your session details. If you
                        are sure that your payment session exists, please
                        contact support.
                    </p>

                    <hr className="border-t border-white/5 w-full" />

                    <MonoButtonUnderlined
                        className="mt-[10px]"
                        onClick={() => {
                            router.push("/");
                        }}
                    >
                        To main page
                    </MonoButtonUnderlined>
                </div>
            </div>
        );
    }

    const { data: order, isPending: isOrderPending } =
        useOrderByStripeSessionId(sessionId);

    if (isOrderPending || isUserPending) {
        return (
            <div className="min-h-screen bg-white/5 flex items-center justify-center">
                <div className="animate-spin h-16 w-16 border-4 border-white border-t-transparent"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex text-white items-center justify-center">
                <div className="flex flex-col items-center gap-[15px] bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px] max-w-lg text-center">
                    <div className="flex flex-col gap-[20px] items-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-800 rounded-full">
                            <CheckIcon className="w-[50px] fill-none stroke-white stroke-2" />
                        </div>
                        <div className="text-5xl font-perandory tracking-wider">
                            Payment not found
                        </div>
                    </div>
                    <p className="text-neutral-400 font-light">
                        We were unable to retrieve your order details. If you
                        are sure that your order exists, please contact support.
                    </p>

                    <hr className="border-t border-white/5 w-full" />

                    <MonoButtonUnderlined
                        className="mt-[10px]"
                        onClick={() => {
                            router.push("/");
                        }}
                    >
                        To main page
                    </MonoButtonUnderlined>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex text-white items-center justify-center py-[20px]">
            <div className="flex flex-col gap-[10px] bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px] max-w-lg">
                <div className="flex flex-col items-center gap-[15px] text-center">
                    <div className="flex flex-col gap-[20px] items-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-800 rounded-full">
                            <CheckIcon className="w-[50px] fill-none stroke-white stroke-2" />
                        </div>
                        <div className="text-5xl font-perandory tracking-wider">
                            Payment successful
                        </div>
                    </div>
                    <p className="text-neutral-400 font-light">
                        Thank you for your purchase. Your order has been
                        created.
                    </p>
                    <hr className="border-t border-white/5 w-full" />
                    <div className="flex items-center gap-[7px] px-4 py-2 w-full">
                        <div className="font-light">Order number:</div>
                        <span className="font-semibold">{order.id}</span>
                    </div>
                </div>
                {user && order.userId === user.id && (
                    <>
                        <hr className="border-t border-white/5 w-full" />
                        <div className="flex flex-col gap-[20px]">
                            <div className="flex flex-col gap-[10px] p-[20px] bg-white/5">
                                <div className="text-2xl font-perandory tracking-wider">
                                    Delivery address
                                </div>
                                <div className="flex flex-col gap-1 font-light">
                                    <div>
                                        Region:{" "}
                                        <span className="font-semibold">
                                            {order.area}
                                        </span>
                                    </div>
                                    <div>
                                        City/village:{" "}
                                        <span className="font-semibold">
                                            {order.city}
                                        </span>
                                    </div>
                                    <div>
                                        Branch/post office:{" "}
                                        <span className="font-semibold">
                                            {order.postDepartment}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[10px] p-[20px] bg-white/5">
                                <div className="text-2xl font-perandory tracking-wider">
                                    Order details
                                </div>

                                <div className="flex flex-col gap-[15px]">
                                    {order.items &&
                                        order.items.length > 0 &&
                                        order.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0"
                                            >
                                                <div>
                                                    <div className="font-perandory tracking-wider text-xl">
                                                        {item.product?.name}
                                                    </div>
                                                    <p className="text-sm text-neutral-500">
                                                        Quantity:{" "}
                                                        {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="font-semibold ">
                                                    $
                                                    {`${
                                                        item.product?.price || 0
                                                    } x
                                                                ${
                                                                    item.quantity
                                                                }`}
                                                </p>
                                                <p className="font-semibold ">
                                                    $
                                                    {(item.product?.price ||
                                                        0) * item.quantity}{" "}
                                                </p>
                                            </div>
                                        ))}
                                </div>
                                <hr className="border-t border-white/5 w-full" />
                                <div>
                                    <div className="flex justify-between items-center text-lg font-bold">
                                        <div className="font-perandory tracking-wider text-xl">
                                            Total cost
                                        </div>
                                        <div className="">
                                            ${order.total || 0}{" "}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <hr className="border-t border-white/5 w-full" />
                <MonoButtonUnderlined
                    className="mt-[10px]"
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    Continue shopping
                </MonoButtonUnderlined>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
