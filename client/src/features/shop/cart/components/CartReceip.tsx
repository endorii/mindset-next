import { MonoLink } from "@/shared/ui/buttons";

interface ICartReceipProps {
    totalPrice: number;
}

export function CartReceip({ totalPrice }: ICartReceipProps) {
    return (
        <div className="w-1/3 h-fit bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] text-lg flex flex-col gap-[13px]">
            <div>
                <div className="text-3xl font-perandory tracking-wider">
                    Receip details
                </div>
                <hr className="border-t border-white/10 my-[15px]" />
                <div className="flex flex-col gap-[15px] text-base font-light">
                    <div className="flex justify-between">
                        <div>Amount of goods</div>
                        <div>${totalPrice.toFixed(2)}</div>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                        <div>Discount</div>
                        <div>$0</div>
                    </div>
                    <div className="flex justify-between text-neutral-400">
                        <div>Delivery</div>
                        <div>$0</div>
                    </div>
                    <div className="flex justify-between mt-[25px] text-xl">
                        <div className="font-perandory tracking-wider text-xl">
                            Total
                        </div>
                        <div className="font-bold">
                            ${totalPrice.toFixed(2)}
                        </div>
                    </div>
                </div>
                <hr className="border-t border-white/10 my-[15px]" />
            </div>

            <div className="flex justify-center">
                <MonoLink href="checkout">Place an order</MonoLink>
            </div>
        </div>
    );
}
