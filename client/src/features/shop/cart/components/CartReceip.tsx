import { MonoLink } from "@/shared/ui/buttons";

interface ICartReceipProps {
    totalPrice: number;
}

function CartReceip({ totalPrice }: ICartReceipProps) {
    return (
        <div className="w-1/3 rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] text-lg flex flex-col gap-[15px]">
            <div>
                <div className="font-bold">Всього</div>
                <hr className="border-t border-white/10 my-[15px]" />
                <div className="flex flex-col gap-[15px]">
                    <div className="flex justify-between">
                        <div>Сума товарів:</div>
                        <div>{totalPrice.toFixed(2)} грн</div>
                    </div>
                    <div className="flex justify-between text-white/50 text-base">
                        <div>Сума знижки:</div>
                        <div>0 грн</div>
                    </div>
                    <div className="flex justify-between text-white/50 text-base">
                        <div>Доставка:</div>
                        <div>0 грн</div>
                    </div>
                    <div className="flex justify-between font-bold mt-[25px]">
                        <div>До сплати:</div>
                        <div>{totalPrice.toFixed(2)} грн</div>
                    </div>
                </div>
            </div>

            <MonoLink href="checkout">Оформити замовлення</MonoLink>
        </div>
    );
}

export default CartReceip;
