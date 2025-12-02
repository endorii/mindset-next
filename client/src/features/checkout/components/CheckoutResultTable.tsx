import { ICartItem } from "@/features/shop/cart/types/cart.types";

export function CheckoutResultTable({ cart }: { cart: ICartItem[] }) {
    return (
        <>
            <div className="text-3xl font-perandory tracking-wider">
                Order information
            </div>
            {cart.length > 0 ? (
                <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-col gap-[10px] mt-[5px] border border-white/5 bg-white/5 p-[20px] text-sm sm:text-[10px] xs:text-[9px] xxs:text-[8px]">
                        <div className="grid grid-cols-[1fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] gap-[5px] border-b border-white/5 pb-2 text-neutral-200">
                            <div>Name</div>
                            <div className="text-center">Color</div>
                            <div className="text-center">Size</div>
                            <div className="text-center">Type</div>
                            <div className="text-center">Price</div>
                            <div className="text-center">Quantity</div>
                            <div className="text-right">Sum</div>
                        </div>

                        <div className="flex flex-col gap-[10px]">
                            {cart.map((item: ICartItem) => (
                                <div
                                    key={item.id}
                                    className="grid grid-cols-[1fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] py-2 gap-[5px]"
                                >
                                    <div className="truncate">
                                        {item.product?.name}
                                    </div>
                                    <div className="text-center truncate">
                                        {item.color}
                                    </div>
                                    <div className="text-center truncate">
                                        {item.size}
                                    </div>
                                    <div className="text-center truncate">
                                        {item.type}
                                    </div>
                                    <div className="text-center truncate">
                                        {item.product?.price} $
                                    </div>
                                    <div className="text-center truncate">
                                        {item.quantity}
                                    </div>
                                    <div className="text-right truncate">
                                        {item.product?.price
                                            ? item.product?.price *
                                              item.quantity
                                            : 0}{" "}
                                        $
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-white/5 pt-4 flex flex-col gap-[10px]">
                            <div className="flex justify-between">
                                <span>Sum of goods:</span>
                                <span className=" font-semibold">
                                    {cart.reduce(
                                        (acc, item) =>
                                            acc +
                                            (item.product?.price
                                                ? item.product?.price *
                                                  item.quantity
                                                : 0),
                                        0
                                    )}{" "}
                                    $
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Delivery:</span>
                                <span className="text-neutral-200 text-sm sm:text-[10px] xs:text-[9px] xxs:text-[8px]">
                                    According to carrier tariffs
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center font-bold text-base border border-white/5 bg-white/5 p-[20px]">
                        <span>Total payable:</span>
                        <span className="text-xl">
                            {cart.reduce(
                                (acc, item) =>
                                    acc +
                                    (item.product?.price
                                        ? item.product?.price * item.quantity
                                        : 0),
                                0
                            )}{" "}
                            $
                        </span>
                    </div>
                </div>
            ) : (
                <div className="text-sm text-neutral-200">Cart is empty</div>
            )}
        </>
    );
}
