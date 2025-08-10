import { ICartItem } from "@/features/shop/cart/types/cart.types";

interface CheckoutResultTable {
    cart: ICartItem[];
}

function CheckoutResultTable({ cart }: CheckoutResultTable) {
    return (
        <>
            <div className="text-3xl font-thin">Інформація про замволення</div>
            {cart.length > 0 ? (
                <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-col gap-[15px] mt-[5px] border border-white/10 rounded-xl bg-white/5 p-[20px]">
                        <div className="grid grid-cols-[1fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] border-b border-white/10 pb-2 text-sm text-gray-400">
                            <div>Назва</div>
                            <div className="text-right">Колір</div>
                            <div className="text-right">Розмір</div>
                            <div className="text-right">Тип</div>
                            <div className="text-right">Ціна</div>
                            <div className="text-right">Кількість</div>
                            <div className="text-right">Сума</div>
                        </div>

                        {cart.map((item: ICartItem) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-[1fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] py-2"
                            >
                                <div>{item.product.name}</div>
                                <div className="text-right">{item.color}</div>
                                <div className="text-right">{item.size}</div>
                                <div className="text-right">{item.type}</div>
                                <div className="text-right">
                                    {item.product.price} ₴
                                </div>
                                <div className="text-right">
                                    {item.quantity}
                                </div>
                                <div className="text-right ">
                                    {item.product.price * item.quantity} ₴
                                </div>
                            </div>
                        ))}

                        <div className="border-t border-white/10 pt-4 flex flex-col gap-[15px]">
                            <div className="flex justify-between">
                                <span>Сума товарів:</span>
                                <span className=" font-semibold">
                                    {cart.reduce(
                                        (acc, item) =>
                                            acc +
                                            item.product.price * item.quantity,
                                        0
                                    )}{" "}
                                    ₴
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Доставка:</span>
                                <span className="text-gray-400 text-sm">
                                    За тарифами перевізника
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center font-bold text-base border border-white/10 rounded-xl bg-white/5 p-[20px]">
                        <span>Усього до сплати:</span>
                        <span className="text-xl">
                            {cart.reduce(
                                (acc, item) =>
                                    acc + item.product.price * item.quantity,
                                0
                            )}{" "}
                            ₴
                        </span>
                    </div>
                </div>
            ) : (
                <div className="text-sm text-gray-300">Кошик порожній</div>
            )}
        </>
    );
}

export default CheckoutResultTable;
