import { CartIcon } from "@/shared/icons";

function HomeFastStat() {
    return (
        <div className="flex flex-col gap-[15px]">
            <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[20px] py-[10px] flex flex-col gap-[4px]">
                <div className="">Статистика за сьогодні</div>
            </div>
            <div className="flex gap-[15px]">
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex gap-[70px] items-center">
                    <div className="flex flex-col gap-[3px]">
                        <div>Сума продажів</div>
                        <div className="flex gap-[15px] items-end">
                            <div className="text-2xl font-semibold">$9,000</div>
                            <div className="text-sm text-green-500 mb-[2px]">
                                +0%
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                        <CartIcon className="w-[25px] stroke-white " />
                    </div>
                </div>
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex gap-[70px] items-center">
                    <div className="flex flex-col gap-[3px]">
                        <div>Кількість відвідувачів</div>
                        <div className="flex gap-[15px] items-end">
                            <div className="text-2xl font-semibold">120</div>
                            <div className="text-sm text-green-500 mb-[2px]">
                                +0%
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                        <CartIcon className="w-[25px] stroke-white " />
                    </div>
                </div>
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex gap-[70px] items-center">
                    <div className="flex flex-col gap-[3px]">
                        <div>Нових реєстрацій</div>
                        <div className="flex gap-[15px] items-end">
                            <div className="text-2xl font-semibold">23</div>
                            <div className="text-sm text-green-500 mb-[2px]">
                                +0%
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                        <CartIcon className="w-[25px] stroke-white " />
                    </div>
                </div>
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex gap-[70px] items-center">
                    <div className="flex flex-col gap-[3px]">
                        <div>Загальних переглядів товарів</div>
                        <div className="flex gap-[15px] items-end">
                            <div className="text-2xl font-semibold">591</div>
                            <div className="text-sm text-green-500 mb-[2px]">
                                +0%
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                        <CartIcon className="w-[25px] stroke-white" />
                    </div>
                </div>
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px] flex gap-[70px] items-center">
                    <div className="flex flex-col gap-[3px]">
                        <div>Кількість замовлень</div>
                        <div className="flex gap-[15px] items-end">
                            <div className="text-2xl font-semibold">68</div>
                            <div className="text-sm text-green-500 mb-[2px]">
                                +0%
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                        <CartIcon className="w-[25px] stroke-white " />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeFastStat;
