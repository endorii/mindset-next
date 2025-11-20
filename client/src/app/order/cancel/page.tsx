"use client";

import { CloseIcon } from "@/shared/icons";
import { ButtonWithIcon } from "@/shared/ui/buttons";

const OrderCancelPage = () => {
    // const {
    //     data: user,
    //     isPending: isUserPending,
    //     isError: isUserError,
    // } = useCurrentUser();

    // if (isOrderPending || isUserPending) {
    //     return (
    //         <div className="min-h-screen bg-white/5 flex items-center justify-center">
    //             <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
    //         </div>
    //     );
    // }

    // if (!order) {
    //     return (
    //         <div className="min-h-screen flex text-white items-center justify-center">
    //             <div className="flex flex-col items-center gap-[15px] bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px] max-w-lg text-center">
    //                 <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-600 rounded-full">
    //                     <CloseIcon className="w-[70px] fill-none stroke-3 stroke-white" />
    //                 </div>

    //                 <h2 className="text-2xl font-bold">
    //                     Замовлення не знайдено
    //                 </h2>
    //                 <p className="text-neutral-400">
    //                     Ми не змогли отримати деталі Вашого замовлення. Якщо ви
    //                     впевнені що ваше замовлення існує - зверніться в службу
    //                     підтримки.
    //                 </p>

    //                 <hr className="border-t border-white/10 w-full" />

    //                 <ButtonWithIcon
    //                     className="bg-white/5 w-full"
    //                     onClick={() => {}}
    //                 >
    //                     На головну
    //                 </ButtonWithIcon>
    //             </div>
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen flex text-white items-center justify-center">
            <div className="flex flex-col gap-[10px] bg-white/5 shadow-lg backdrop-blur-lg border border-white/5 p-[20px] max-w-lg">
                <div className="flex flex-col items-center gap-[15px] text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-full">
                        <CloseIcon className="w-[40px] fill-none stroke-3 stroke-white" />
                    </div>
                    <h1 className="text-3xl font-bold">Payment canceled</h1>
                    <p className="text-neutral-400">
                        Your order has not been processed. Don't worry, you
                        haven't been charged.
                    </p>
                    {/* <hr className="border-t border-white/10 w-full" />
                    <div className="bg-white/5 px-4 py-2 w-full">
                        <p>
                            Номер замовлення:{" "}
                            <span className="font-semibold">{order.id}</span>
                        </p>
                    </div> */}
                </div>

                {/* {user && order.userId === user.id && (
                    <>
                        <hr className="border-t border-white/10 w-full" />
                        <div className="flex flex-col gap-[20px]">
                            <div className="flex flex-col gap-[10px] p-[20px] bg-white/5  ">
                                <h3 className="font-bold flex items-center">
                                    Товари в кошику
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
                                                        Quantity:{" "}
                                                        {item.quantity}
                                                    </p>
                                                </div>
                                                <p className="font-semibold ">
                                                    $
                                                    {`${
                                                        item.product?.price || 0
                                                    } x ${item.quantity}`}
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
                                        <span className="text-red-400">
                                            ${order.total || 0}{" "}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-[10px] p-[20px] bg-white/5  ">
                                <h3 className="font-bold">Що сталося?</h3>
                                <ul className="space-y-2 text-sm text-neutral-400">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">
                                            •
                                        </span>
                                        <span>
                                            Ви натиснули кнопку "Назад" під час
                                            оформлення
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">
                                            •
                                        </span>
                                        <span>
                                            Платіжну інформацію не було
                                            заповнено
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">
                                            •
                                        </span>
                                        <span>
                                            Сесія закінчилася або з'єднання було
                                            втрачено
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )} */}

                <hr className="border-t border-white/10 w-full" />

                <div className="flex flex-col gap-3">
                    <ButtonWithIcon className="bg-white/5" onClick={() => {}}>
                        To main page
                    </ButtonWithIcon>
                    {/* <ButtonWithIcon className="bg-white/5" onClick={() => {}}>
                        Переглянути кошик
                    </ButtonWithIcon>
                    <ButtonWithIcon className="bg-white/5" onClick={() => {}}>
                        Продовжити покупки
                    </ButtonWithIcon> */}
                </div>
            </div>
        </div>
    );
};

export default OrderCancelPage;
