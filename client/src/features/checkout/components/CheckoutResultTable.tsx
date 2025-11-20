import { ICartItem } from "@/features/shop/cart/types/cart.types";

export function CheckoutResultTable({ cart }: { cart: ICartItem[] }) {
    return (
        <>
            <div className="text-3xl font-thin">Order information</div>
            {cart.length > 0 ? (
                <div className="flex flex-col gap-[10px]">
                    <div className="flex flex-col gap-[10px] mt-[5px] border border-white/10 bg-white/5 p-[20px]">
                        <div className="grid grid-cols-[1fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] border-b border-white/10 pb-2 text-sm text-neutral-200">
                            <div>Name</div>
                            <div className="text-right">Color</div>
                            <div className="text-right">Size</div>
                            <div className="text-right">Type</div>
                            <div className="text-right">Price</div>
                            <div className="text-right">Quantity</div>
                            <div className="text-right">Sum</div>
                        </div>

                        {cart.map((item: ICartItem) => (
                            <div
                                key={item.id}
                                className="grid grid-cols-[1fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr] py-2"
                            >
                                <div>{item.product?.name}</div>
                                <div className="text-right">{item.color}</div>
                                <div className="text-right">{item.size}</div>
                                <div className="text-right">{item.type}</div>
                                <div className="text-right">
                                    {item.product?.price} $
                                </div>
                                <div className="text-right">
                                    {item.quantity}
                                </div>
                                <div className="text-right ">
                                    {item.product?.price
                                        ? item.product?.price * item.quantity
                                        : 0}{" "}
                                    $
                                </div>
                            </div>
                        ))}

                        <div className="border-t border-white/10 pt-4 flex flex-col gap-[10px]">
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
                                <span className="text-neutral-200 text-sm">
                                    According to carrier tariffs
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center font-bold text-base border border-white/10 bg-white/5 p-[20px]">
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
