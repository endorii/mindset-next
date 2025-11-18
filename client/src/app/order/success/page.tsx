"use client";

import { useOrderByStripeSessionId } from "@/features/orders/hooks/useOrders";
import { useCurrentUser } from "@/features/shop/user-info/hooks/useUsers";
import { CheckIcon } from "@/shared/icons";
import { ButtonWithIcon } from "@/shared/ui/buttons";
import { useSearchParams } from "next/navigation";

const OrderSuccessPage = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");

    const {
        data: user,
        isPending: isUserPending,
        isError: isUserError,
    } = useCurrentUser();

    if (!sessionId) {
        return (
            <div className="min-h-screen flex text-white items-center justify-center">
                <div className="flex flex-col items-center gap-[15px] bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px] max-w-lg text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-600 rounded-full">
                        <CheckIcon className="w-[50px] fill-none stroke-white stroke-3" />
                    </div>

                    <h2 className="text-2xl font-bold">
                        Замовлення не знайдено
                    </h2>
                    <p className="text-neutral-400">
                        Ми не змогли отримати деталі замовлення. Якщо ви
                        впевнені що ваше замовлення існує - зверніться в службу
                        підтримки.
                    </p>

                    <hr className="border-t border-white/10 w-full" />

                    <ButtonWithIcon
                        // href="/"
                        className="bg-white/5 w-full"
                        onClick={() => {}}
                    >
                        На головну
                    </ButtonWithIcon>
                </div>
            </div>
        );
    }

    const { data: order, isPending: isOrderPending } =
        useOrderByStripeSessionId(sessionId);

    if (isOrderPending || isUserPending) {
        return (
            <div className="min-h-screen bg-white/5 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex text-white items-center justify-center">
                <div className="flex flex-col items-center gap-[15px] bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px] max-w-lg text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-600 rounded-full">
                        <CheckIcon className="w-[50px] fill-none stroke-white stroke-3" />
                    </div>

                    <h2 className="text-2xl font-bold">
                        Замовлення не знайдено
                    </h2>
                    <p className="text-neutral-400">
                        Ми не змогли отримати деталі Вашого замовлення. Якщо ви
                        впевнені що ваше замовлення існує - зверніться в службу
                        підтримки.
                    </p>

                    <hr className="border-t border-white/10 w-full" />

                    <ButtonWithIcon
                        // href="/"
                        className="bg-white/5 w-full"
                        onClick={() => {}}
                    >
                        На головну
                    </ButtonWithIcon>
                </div>
            </div>
        );
    }

    console.log(order);

    return (
        <div className="min-h-screen flex text-white items-center justify-center">
            <div className="flex flex-col gap-[15px] bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px] max-w-lg">
                <div className="flex flex-col items-center gap-[15px] text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full">
                        <CheckIcon className="w-[50px] fill-none stroke-white stroke-3" />
                    </div>
                    <h1 className="text-3xl font-bold">Оплата успішна!</h1>
                    <p className="text-neutral-400">
                        Дякуємо за покупку. Ваше замовлення створено.
                    </p>
                    <hr className="border-t border-white/10 w-full" />
                    <div className="bg-white/5 px-4 py-2 w-full">
                        <p>
                            Номер замовлення:{" "}
                            <span className="font-semibold">{order.id}</span>
                        </p>
                    </div>
                </div>
                {user && order.userId === user.id && (
                    <>
                        <hr className="border-t border-white/10 w-full" />
                        <div className="flex flex-col gap-[20px]">
                            <div className="flex flex-col gap-[15px] p-[20px] bg-white/5 rounded-lg">
                                <div className="text-3xl font-perandory tracking-wider">
                                    Delivery address
                                </div>
                                <div className="flex flex-col gap-1">
                                    <div>
                                        Область:{" "}
                                        <span className="font-semibold">
                                            {order.area}
                                        </span>
                                    </div>
                                    <div>
                                        Місто/село:{" "}
                                        <span className="font-semibold">
                                            {order.city}
                                        </span>
                                    </div>
                                    <div>
                                        Відділення/поштомат:{" "}
                                        <span className="font-semibold">
                                            {order.postDepartment}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-[15px] p-[20px] bg-white/5 rounded-lg">
                                <h3 className="font-bold flex items-center">
                                    Деталі замовлення
                                </h3>

                                <div className="">
                                    {order.items &&
                                        order.items.length > 0 &&
                                        order.items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex justify-between items-center pb-4 border-b border-gray-100 last:border-0"
                                            >
                                                <div>
                                                    <p className="font-semibold ">
                                                        {item.product?.name}
                                                    </p>
                                                    <p className="text-sm text-neutral-500">
                                                        Кількість:{" "}
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
                                <hr className="border-t border-white/10 w-full" />
                                <div>
                                    <div className="flex justify-between items-center text-lg font-bold">
                                        <span className="">
                                            Загальна вартість
                                        </span>
                                        <span className="">
                                            ${order.total || 0}{" "}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                <hr className="border-t border-white/10 w-full" />
                <ButtonWithIcon
                    // href="/"
                    className="bg-white/5"
                    onClick={() => {}}
                >
                    Продовжити покупки
                </ButtonWithIcon>
            </div>
        </div>
    );
};

export default OrderSuccessPage;
