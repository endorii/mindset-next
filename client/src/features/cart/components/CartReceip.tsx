interface ICartReceipProps {
    totalPrice: number;
}

function CartReceip({ totalPrice }: ICartReceipProps) {
    return (
        <div className="w-[27%] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] text-lg">
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

            <button className="flex justify-center gap-[10px] text-white bg-transparent px-[15px] py-[15px] rounded-xl font-bold border mt-[50px] border-white/15 cursor-pointer w-full disabled:cursor-not-allowed text-base">
                Купити
            </button>
        </div>
    );
}

export default CartReceip;
