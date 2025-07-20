"use client";

import { useOrders } from "@/features/orders/hooks/useOrders";
import { ProductsIcon, InfoIcon, EditIcon, TrashIcon } from "@/shared/icons";
import ButtonWithIcon from "@/shared/ui/buttons/ButtonWithIcon";
import ChooseButton from "@/shared/ui/buttons/ChooseButton";
import DeleteButtonWithIcon from "@/shared/ui/buttons/DeleteButtonWithIcon";
import LinkWithIcon from "@/shared/ui/buttons/LinkWithIcon";
import { formatDate } from "@/shared/utils/formatDate";

function page() {
    const { data: orders } = useOrders();

    const sortFilters = ["Спочатку новіші", "Спочатку старіші"];
    const statusFilters = [
        "Обробляється",
        "Оплачено",
        "Відправлено",
        "Доставлено",
        "Відмінено",
    ];

    return (
        <div className="flex flex-col gap-[15px]">
            <div className="flex gap-[15px] justify-between items-center rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                <div className="text-2xl font-bold">Список замовлень:</div>
            </div>

            <div className="flex items-center gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[20px] py-[10px]">
                <div className="font-semibold">Фільтрувати за часом:</div>
                <ul className="flex gap-[10px]">
                    {sortFilters.map((name, i) => (
                        <li key={i}>
                            <ChooseButton
                                onClick={function (): void {
                                    throw new Error(
                                        "Function not implemented."
                                    );
                                }}
                            >
                                {name}
                            </ChooseButton>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex items-center gap-[15px] rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 px-[20px] py-[10px]">
                <div className="font-semibold">Фільтрувати з статусом:</div>
                <ul className="flex gap-[10px]">
                    {statusFilters.map((name, i) => (
                        <li key={i}>
                            <ChooseButton
                                onClick={function (): void {
                                    throw new Error(
                                        "Function not implemented."
                                    );
                                }}
                            >
                                {name}
                            </ChooseButton>
                        </li>
                    ))}
                </ul>
            </div>
            {orders && orders.length > 0 ? (
                <div className="rounded-xl bg-white/5 shadow-lg backdrop-blur-[100px] border border-white/5 p-[20px]">
                    <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr_2fr_230px] gap-[20px] p-4 rounded-t-lg font-semibold text-sm">
                        <div>Ім'я</div>
                        <div>Телефон</div>
                        <div>Статус</div>
                        <div>Сума, грн</div>
                        <div>Дата створення / оновлення</div>
                        <div className="text-right">Дії</div>
                    </div>
                    <div className="border border-white/10 rounded-xl">
                        {orders?.map((order) => (
                            <div
                                key={order.id}
                                className="grid grid-cols-[1.5fr_1fr_1fr_1fr_2fr_230px] gap-[20px] p-4 border-b border-white/10 last:border-b-0 items-center"
                            >
                                <div>{order.fullName}</div>
                                <div>{order.phoneNumber}</div>
                                <div>
                                    {
                                        {
                                            pending: "Обробляється",
                                            paid: "Оплачено",
                                            shipped: "Відправлено",
                                            delivered: "Доставлено",
                                            canceled: "Відмінено",
                                        }[order.status]
                                    }
                                </div>
                                <div>{order.total.toLocaleString()}</div>
                                <div>
                                    {formatDate(order.createdAt || "")} /{" "}
                                    {formatDate(order.updatedAt || "")}
                                </div>
                                <div className="flex gap-[10px] justify-end">
                                    <ButtonWithIcon onClick={() => {}}>
                                        <InfoIcon className="w-[30px] fill-none stroke-white stroke-2 group-hover:stroke-black" />
                                    </ButtonWithIcon>
                                    <ButtonWithIcon onClick={() => {}}>
                                        <EditIcon className="w-[26px] stroke-white stroke-2 group-hover:stroke-black fill-none" />
                                    </ButtonWithIcon>
                                    <DeleteButtonWithIcon onClick={() => {}}>
                                        <TrashIcon className="w-[30px] stroke-white stroke-[1.7] fill-none" />
                                    </DeleteButtonWithIcon>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>Замовлення відсутні</div>
            )}
        </div>
    );
}

export default page;
